import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Pressable } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

const Training07Screen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cameraRef = useRef();

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const pauseCamera = async () => {
    setIsPaused(prevState => !prevState);
    console.log('isPaused is', isPaused);
    if (isPaused) {
      console.log('isPaused')
      await cameraRef.current.resumePreview();
    } else {
      console.log('!isPaused')
      await cameraRef.current.pausePreview();
    }
  };

  const openCamera = () => {
    if (isCameraOpen) {
      setIsCameraOpen(false);
      console.log('isCameraOpen is', isCameraOpen);
    } else {
      getPermission();
      setIsCameraOpen(true);
      console.log('isCameraOpen is', isCameraOpen);
    }
  };

  const addParams = () => {
    setIsCameraOpen(false);
    navigation.navigate('Training08')
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {isCameraOpen && hasPermission === null ? (
          <View style={styles.cameraError}>
            <Text>Requesting camera permission</Text>
            <Button onPress={getPermission}>Grant Permission</Button>
          </View>
        ) : isCameraOpen && hasPermission === false ? (
          <View style={styles.cameraError}>
            <Text>No access to camera</Text>
            <Button onPress={getPermission}>Grant Permission</Button>
          </View>
        ) : isCameraOpen ? (
          <Pressable onPress={pauseCamera}>
            <Camera type={CameraType.front} ref={cameraRef} style={styles.camera} />
            <Text style={styles.cameraPauseText}>{isPaused ? '映像をタップして再開' : '映像をタップして一時停止'}</Text>
          </Pressable>
        ) : (
          <Image source={require('../../assets/images/07_hoho.png')} style={styles.exampleImage} />
        )}
        <IconButton icon={isCameraOpen ? 'close' : 'camera'} mode={isCameraOpen ? 'contained-tonal' : 'contained'} style={styles.cameraButton} onPress={openCamera} />
      </View>
      <View style={styles.sectionContainer}>
        <Text variant="displayLarge">07<Text variant="labelMedium"> / 10</Text></Text>
        <Text variant="bodyMedium">動かしずらい方の頬を膨らませる時、空気は漏れますか？</Text>
        <Text variant="bodyMedium">反対側の頬も膨らませられますか？</Text>
        <Button mode="contained-tonal" style={styles.inputButton} onPress={addParams}>次へ</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    height: '50%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  sectionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },

  cameraButton: {
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
  cameraError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraPauseText: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
  },
  exampleImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  inputButton: {
    marginTop: 10,
  },
});

export default Training07Screen;
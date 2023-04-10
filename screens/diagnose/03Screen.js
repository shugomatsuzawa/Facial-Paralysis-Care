import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Pressable } from 'react-native';
import { useTheme, Button, IconButton, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

const Diagnose03Screen = ({ route, navigation }) => {
  const theme = useTheme();
  // console.log(route);
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

  const addParams = (score) => {
    const params = route.params
    setIsCameraOpen(false);
    params.karui_heigan = score;
    navigation.navigate('Diagnose04', params)
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
          <Image source={require('../../assets/images/03_karui-heigan.png')} style={styles.exampleImage} />
        )}
        <IconButton icon={isCameraOpen ? 'close' : 'camera'} mode={isCameraOpen ? 'contained-tonal' : 'contained'} style={styles.cameraButton} onPress={openCamera} />
      </View>
      <SafeAreaView style={styles.inputContainer}>
        <View>
          <View style={styles.progress}>
            <Text variant="displayLarge" style={{color: theme.colors.primary}}>03</Text>
            <Text variant="labelMedium" style={{color: theme.colors.secondary}}> / 10</Text>
          </View>
          <Text variant="bodyMedium">軽く目をつぶってみてください。</Text>
        </View>
        <View>
          <Button mode="contained" style={styles.inputButton} onPress={() => addParams(4)}>動く</Button>
          <Button mode="contained" style={styles.inputButton} onPress={() => addParams(2)}>少し動く</Button>
          <Button mode="contained" style={styles.inputButton} onPress={() => addParams(0)}>動かない</Button>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  inputContainer: {
    height: 320,
    marginVertical: 16,
    marginHorizontal: 16,
    justifyContent: 'space-between',
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

  progress: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  inputButton: {
    marginBottom: 10,
  },
});

export default Diagnose03Screen;
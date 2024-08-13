import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Image, Pressable } from 'react-native';
import { useTheme, Button, IconButton, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera/legacy';
import styles from '../../components/DiagnoseStyle';

const Training01Screen = ({ navigation }) => {
  const theme = useTheme();
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
    navigation.navigate('Training02')
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.dynamic.background}]}>
      <View style={styles.cameraContainer}>
        {isCameraOpen && !hasPermission ? (
          <View style={styles.cameraError}>
            <Text style={styles.cameraErrorText}>カメラへのアクセスを許可してください</Text>
          </View>
        ) : isCameraOpen ? (
          <Pressable onPress={pauseCamera}>
            <Camera type={CameraType.front} ref={cameraRef} style={styles.camera} />
            <Text style={styles.cameraPauseText}>{isPaused ? '映像をタップして再開' : '映像をタップして一時停止'}</Text>
          </Pressable>
        ) : (
          <Image source={require('../../assets/images/01_ansei.png')} style={styles.exampleImage} />
        )}
        <IconButton icon={isCameraOpen ? 'close' : 'camera'} mode={isCameraOpen ? 'contained-tonal' : 'contained'} style={styles.cameraButton} onPress={openCamera} />
      </View>
      <SafeAreaView style={styles.inputContainer}>
        <View>
          <View style={styles.progress}>
            <Text variant="displayLarge" style={{color: theme.colors.dynamic.primary}}>01</Text>
            <Text variant="labelMedium" style={{color: theme.colors.dynamic.secondary}}> / 10</Text>
          </View>
          <Text variant="bodyMedium">まず、顔を動かさない状態で左右対称になっているかを確認します。</Text>
        </View>
        <View>
          <Button mode="contained-tonal" style={styles.inputButton} onPress={addParams}>次へ</Button>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

export default Training01Screen;
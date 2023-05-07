import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Image, Pressable } from 'react-native';
import { useTheme,Button, IconButton, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import styles from '../../components/DiagnoseStyle';

const Diagnose04Screen = ({ route, navigation }) => {
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
    params.tsuyoi_heigan = score;
    navigation.navigate('Diagnose05', params)
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
          <Image source={require('../../assets/images/04_tsuyoi-heigan.png')} style={styles.exampleImage} />
        )}
        <IconButton icon={isCameraOpen ? 'close' : 'camera'} mode={isCameraOpen ? 'contained-tonal' : 'contained'} style={styles.cameraButton} onPress={openCamera} />
      </View>
      <SafeAreaView style={styles.inputContainer}>
        <View>
          <View style={styles.progress}>
            <Text variant="displayLarge" style={{color: theme.colors.dynamic.primary}}>04</Text>
            <Text variant="labelMedium" style={{color: theme.colors.dynamic.secondary}}> / 10</Text>
          </View>
          <Text variant="bodyMedium">ぎゅっと強く目をつぶってみてください。</Text>
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

export default Diagnose04Screen;
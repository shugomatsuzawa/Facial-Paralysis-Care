import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, SafeAreaView, Image, Pressable } from 'react-native';
import { useTheme, Button, IconButton, Text } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import styles from '../../components/DiagnoseStyle';

const Training09Screen = ({ navigation }) => {
  const theme = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const getPermission = async () => {
    const result = await requestPermission();
    setHasPermission(result?.granted === true);
  };

  const pauseCamera = () => {
    setIsPaused(prevState => !prevState);
    console.log('isPaused is', !isPaused);
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
    navigation.navigate('Training10')
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
            <CameraView facing="front" active={!isPaused} style={styles.camera} />
            <Text style={styles.cameraPauseText}>{isPaused ? '映像をタップして再開' : '映像をタップして一時停止'}</Text>
          </Pressable>
        ) : (
          <Image source={require('../../assets/images/09_kuchibue.png')} style={styles.exampleImage} />
        )}
        <IconButton icon={isCameraOpen ? 'close' : 'camera'} mode={isCameraOpen ? 'contained-tonal' : 'contained'} style={styles.cameraButton} onPress={openCamera} />
      </View>
      <SafeAreaView style={styles.inputContainer}>
        <View>
          <View style={styles.progress}>
            <Text variant="displayLarge" style={{color: theme.colors.dynamic.primary}}>09</Text>
            <Text variant="labelMedium" style={{color: theme.colors.dynamic.secondary}}> / 10</Text>
          </View>
          <Text variant="bodyMedium">口笛を吹くように口を尖らせます。</Text>
        </View>
        <View>
          <Button mode="contained-tonal" style={styles.inputButton} onPress={addParams}>次へ</Button>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

export default Training09Screen;

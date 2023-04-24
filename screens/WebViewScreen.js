import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  // const theme = useTheme();
  // console.debug(route);
  const uri = route.params.uri;

  return (
    <WebView
      style={styles.container}
      source={{ uri: uri }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
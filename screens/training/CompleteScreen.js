import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-paper';

const DiagnoseResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.sectionContainer}>
        <Text variant="headlineMedium">お疲れ様でした</Text>
        <Button mode="contained-tonal" style={styles.inputButton} onPress={() => navigation.popToTop()}>完了</Button>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  inputButton: {
    marginTop: 10,
  },
});

export default DiagnoseResultScreen;
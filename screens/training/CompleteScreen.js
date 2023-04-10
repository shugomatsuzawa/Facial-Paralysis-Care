import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import CompleteImage from '../../components/CompleteImage';

const TrainingCompleteScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <SafeAreaView style={styles.sectionContainer}>
        <CompleteImage style={styles.completeImage} />
        <Text variant="headlineMedium">お疲れ様でした</Text>
        <Text variant="bodyMedium" style={styles.mt10}>この調子でいきましょう。</Text>
        <Button mode="contained-tonal" style={styles.mt10} onPress={() => navigation.popToTop()}>完了</Button>
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
  completeImage: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    marginBottom: 60,
  },
  mt10: {
    marginTop: 10,
  },
});

export default TrainingCompleteScreen;
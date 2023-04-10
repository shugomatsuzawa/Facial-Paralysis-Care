import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import PerfectImage from '../../components/PerfectImage';
import YouDidItImage from '../../components/YouDidItImage';

const DiagnoseCongratulationScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const isFirst = route.params.isFirst;
  console.log(isFirst);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <SafeAreaView style={styles.sectionContainer}>
        {isFirst == 40 ? (
          <PerfectImage style={styles.completeImage} />
        ) : isFirst == 20 ? (
          <YouDidItImage style={styles.completeImage} />
        ) : ''}
        <Text variant="headlineMedium">やりました！</Text>
        <Text variant="bodyMedium" style={styles.mt10}>初めて{isFirst == 40 ? '40点満点を' : isFirst == 20 ? '20点以上を' : ''}獲得しました。</Text>
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

export default DiagnoseCongratulationScreen;
import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-web';
// import Header from './components/Header';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import Diagnose01Screen from './screens/diagnose/01Screen';
import Diagnose02Screen from './screens/diagnose/02Screen';
import Diagnose03Screen from './screens/diagnose/03Screen';
import Diagnose04Screen from './screens/diagnose/04Screen';
import Diagnose05Screen from './screens/diagnose/05Screen';
import Diagnose06Screen from './screens/diagnose/06Screen';
import Diagnose07Screen from './screens/diagnose/07Screen';
import Diagnose08Screen from './screens/diagnose/08Screen';
import Diagnose09Screen from './screens/diagnose/09Screen';
import Diagnose10Screen from './screens/diagnose/10Screen';
import DiagnoseResultScreen from './screens/diagnose/ResultScreen';
import Training01Screen from './screens/training/01Screen';
import Training02Screen from './screens/training/02Screen';
import Training03Screen from './screens/training/03Screen';
import Training04Screen from './screens/training/04Screen';
import Training05Screen from './screens/training/05Screen';
import Training06Screen from './screens/training/06Screen';
import Training07Screen from './screens/training/07Screen';
import Training08Screen from './screens/training/08Screen';
import Training09Screen from './screens/training/09Screen';
import Training10Screen from './screens/training/10Screen';
import TrainingCompleteScreen from './screens/training/CompleteScreen';
import DataScreen from './screens/data/DataScreen';
import DataDetailScreen from './screens/data/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: '概要' }} />
          <Stack.Screen name="About" component={AboutScreen} options={{ title: '病気について' }} />
          <Stack.Screen name="Diagnose01" component={Diagnose01Screen} options={{ title: '安静時非対称' }} />
          <Stack.Screen name="Diagnose02" component={Diagnose02Screen} options={{ title: '額のしわ寄せ' }} />
          <Stack.Screen name="Diagnose03" component={Diagnose03Screen} options={{ title: '軽い閉眼' }} />
          <Stack.Screen name="Diagnose04" component={Diagnose04Screen} options={{ title: '強い閉眼' }} />
          <Stack.Screen name="Diagnose05" component={Diagnose05Screen} options={{ title: '片目つぶり' }} />
          <Stack.Screen name="Diagnose06" component={Diagnose06Screen} options={{ title: '鼻翼を動かす' }} />
          <Stack.Screen name="Diagnose07" component={Diagnose07Screen} options={{ title: '頬を膨らます' }} />
          <Stack.Screen name="Diagnose08" component={Diagnose08Screen} options={{ title: 'イーと歯を見せる' }} />
          <Stack.Screen name="Diagnose09" component={Diagnose09Screen} options={{ title: '口笛' }} />
          <Stack.Screen name="Diagnose10" component={Diagnose10Screen} options={{ title: '口をへの字に曲げる' }} />
          <Stack.Screen name="DiagnoseResult" component={DiagnoseResultScreen} options={{ title: '結果' }} />
          <Stack.Screen name="Training01" component={Training01Screen} options={{ title: '安静時非対称' }} />
          <Stack.Screen name="Training02" component={Training02Screen} options={{ title: '額のしわ寄せ' }} />
          <Stack.Screen name="Training03" component={Training03Screen} options={{ title: '軽い閉眼' }} />
          <Stack.Screen name="Training04" component={Training04Screen} options={{ title: '強い閉眼' }} />
          <Stack.Screen name="Training05" component={Training05Screen} options={{ title: '片目つぶり' }} />
          <Stack.Screen name="Training06" component={Training06Screen} options={{ title: '鼻翼を動かす' }} />
          <Stack.Screen name="Training07" component={Training07Screen} options={{ title: '頬を膨らます' }} />
          <Stack.Screen name="Training08" component={Training08Screen} options={{ title: 'イーと歯を見せる' }} />
          <Stack.Screen name="Training09" component={Training09Screen} options={{ title: '口笛' }} />
          <Stack.Screen name="Training10" component={Training10Screen} options={{ title: '口をへの字に曲げる' }} />
          <Stack.Screen name="TrainingComplete" component={TrainingCompleteScreen} options={{ title: '完了' }} />
          <Stack.Screen name="Data" component={DataScreen} options={{ title: '全ての記録データ' }} />
          <Stack.Screen name="DataDetail" component={DataDetailScreen} options={{ title: '詳細' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

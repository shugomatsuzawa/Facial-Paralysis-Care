import React from 'react';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
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
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  const theme = colorScheme === 'dark' ? {
    ...MD3DarkTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      "primary": "#80B2A9",
      "onPrimary": "#051320",
      "primaryContainer": "rgb(0, 78, 90)",
      "onPrimaryContainer": "rgb(164, 238, 255)",
      "secondary": "rgb(178, 203, 209)",
      "onSecondary": "rgb(28, 52, 57)",
      "secondaryContainer": "rgb(51, 74, 80)",
      "onSecondaryContainer": "rgb(205, 231, 237)",
      "tertiary": "rgb(189, 197, 235)",
      "onTertiary": "rgb(38, 47, 77)",
      "tertiaryContainer": "rgb(61, 69, 101)",
      "onTertiaryContainer": "rgb(220, 225, 255)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "#000000",
      "onBackground": "rgb(225, 227, 227)",
      "surface": "rgb(25, 28, 29)",
      "onSurface": "rgb(225, 227, 227)",
      "surfaceVariant": "rgb(63, 72, 75)",
      "onSurfaceVariant": "rgb(191, 200, 203)",
      "outline": "rgb(137, 146, 149)",
      "outlineVariant": "rgb(63, 72, 75)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(225, 227, 227)",
      "inverseOnSurface": "rgb(46, 49, 50)",
      "inversePrimary": "rgb(0, 104, 119)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(28, 37, 40)",
        "level2": "rgb(30, 43, 46)",
        "level3": "rgb(31, 49, 52)",
        "level4": "rgb(32, 50, 54)",
        "level5": "rgb(33, 54, 59)"
      },
      "surfaceDisabled": "rgba(225, 227, 227, 0.12)",
      "onSurfaceDisabled": "rgba(225, 227, 227, 0.38)",
      "backdrop": "rgba(41, 50, 52, 0.4)"
    },
  } : {
    ...MD3LightTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      "primary": "rgb(0, 104, 119)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(164, 238, 255)",
      "onPrimaryContainer": "rgb(0, 31, 37)",
      "secondary": "rgb(75, 98, 104)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(205, 231, 237)",
      "onSecondaryContainer": "rgb(5, 31, 36)",
      "tertiary": "rgb(84, 93, 126)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(220, 225, 255)",
      "onTertiaryContainer": "rgb(17, 26, 55)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(242, 244, 245)",
      "onBackground": "rgb(25, 28, 29)",
      "surface": "#FFFFFF",
      "onSurface": "rgb(25, 28, 29)",
      "surfaceVariant": "rgb(219, 228, 231)",
      "onSurfaceVariant": "rgb(63, 72, 75)",
      "outline": "rgb(111, 121, 123)",
      "outlineVariant": "rgb(191, 200, 203)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(46, 49, 50)",
      "inverseOnSurface": "rgb(239, 241, 242)",
      "inversePrimary": "rgb(82, 215, 240)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(238, 245, 246)",
        "level2": "rgb(231, 240, 242)",
        "level3": "rgb(223, 236, 238)",
        "level4": "rgb(221, 234, 237)",
        "level5": "rgb(216, 231, 234)"
      },
      "surfaceDisabled": "rgba(25, 28, 29, 0.12)",
      "onSurfaceDisabled": "rgba(25, 28, 29, 0.38)",
      "backdrop": "rgba(41, 50, 52, 0.4)"
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
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

import React from 'react';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';

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
import DiagnoseCongratulationScreen from './screens/diagnose/CongratulationScreen';
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
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  // console.log(LightTheme.colors);
  // console.log(DarkTheme.colors);
  const theme = colorScheme === 'dark' ? {
    ...MD3DarkTheme,
    ...DarkTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
      "primary": "rgb(76, 218, 218)",
      "onPrimary": "rgb(0, 55, 55)",
      "primaryContainer": "rgb(0, 79, 80)",
      "onPrimaryContainer": "rgb(111, 247, 246)",
      "secondary": "rgb(120, 209, 255)",
      "onSecondary": "rgb(0, 53, 73)",
      "secondaryContainer": "rgb(0, 76, 104)",
      "onSecondaryContainer": "rgb(195, 232, 255)",
      "tertiary": "rgb(255, 185, 91)",
      "onTertiary": "rgb(70, 42, 0)",
      "tertiaryContainer": "rgb(100, 63, 0)",
      "onTertiaryContainer": "rgb(255, 221, 183)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "#001e2c",
      "onBackground": "rgb(225, 226, 229)",
      "surface": "#003549",
      "onSurface": "rgb(225, 226, 229)",
      "surfaceVariant": "rgb(65, 72, 77)",
      "onSurfaceVariant": "rgb(192, 199, 205)",
      "outline": "rgb(138, 146, 151)",
      "outlineVariant": "rgb(65, 72, 77)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(225, 226, 229)",
      "inverseOnSurface": "rgb(46, 49, 51)",
      "inversePrimary": "rgb(0, 102, 137)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(30, 37, 41)",
        "level2": "rgb(33, 43, 48)",
        "level3": "rgb(36, 48, 55)",
        "level4": "rgb(36, 50, 57)",
        "level5": "rgb(38, 53, 62)"
      },
      "surfaceDisabled": "rgba(225, 226, 229, 0.12)",
      "onSurfaceDisabled": "rgba(225, 226, 229, 0.38)",
      "backdrop": "rgba(42, 49, 54, 0.4)",

      badgeGold: "#E8C16A",
      onBadgeGold: "rgb(25, 28, 30)",
      badgeSilver: "#c5c6c9",
      onBadgeSilver: "rgb(25, 28, 30)",

      "border": "rgb(65, 72, 77)",
      "card": "#001e2c",
      "notification": "rgb(255, 180, 171)",
      "text": "rgb(225, 226, 229)",
    },
  } : {
    ...MD3LightTheme,
    ...LightTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      "primary": "rgb(0, 102, 137)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(195, 232, 255)",
      "onPrimaryContainer": "rgb(0, 30, 44)",
      "secondary": "rgb(0, 106, 106)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(111, 247, 246)",
      "onSecondaryContainer": "rgb(0, 32, 32)",
      "tertiary": "rgb(132, 84, 0)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 221, 183)",
      "onTertiaryContainer": "rgb(42, 24, 0)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "#ebf2f8",
      "onBackground": "rgb(25, 28, 30)",
      "surface": "rgb(251, 252, 254)",
      "onSurface": "rgb(25, 28, 30)",
      "surfaceVariant": "rgb(220, 227, 233)",
      "onSurfaceVariant": "rgb(65, 72, 77)",
      "outline": "rgb(113, 120, 125)",
      "outlineVariant": "rgb(192, 199, 205)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(46, 49, 51)",
      "inverseOnSurface": "rgb(240, 241, 243)",
      "inversePrimary": "rgb(120, 209, 255)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(238, 245, 248)",
        "level2": "rgb(231, 240, 245)",
        "level3": "rgb(223, 236, 241)",
        "level4": "rgb(221, 234, 240)",
        "level5": "rgb(216, 231, 238)"
      },
      "surfaceDisabled": "rgba(25, 28, 30, 0.12)",
      "onSurfaceDisabled": "rgba(25, 28, 30, 0.38)",
      "backdrop": "rgba(42, 49, 54, 0.4)",

      badgeGold: "#E8C16A",
      onBadgeGold: "rgb(25, 28, 30)",
      badgeSilver: "#c5c6c9",
      onBadgeSilver: "rgb(25, 28, 30)",

      "border": "rgb(192, 199, 205)",
      "card": "#ebf2f8",
      "notification": "rgb(186, 26, 26)",
      "text": "rgb(25, 28, 30)",
    },
  };

  NavigationBar.setBackgroundColorAsync(theme.colors.background);

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
          <Stack.Screen name="DiagnoseCongratulation" component={DiagnoseCongratulationScreen} options={{ title: 'おめでとう', headerShown: false, gestureEnabled: false }} />
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
          <Stack.Screen name="TrainingComplete" component={TrainingCompleteScreen} options={{ title: '完了', headerBackVisible: false, gestureEnabled: false }} />
          <Stack.Screen name="Data" component={DataScreen} options={{ title: '全ての記録データ' }} />
          <Stack.Screen name="DataDetail" component={DataDetailScreen} options={{ title: '詳細' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

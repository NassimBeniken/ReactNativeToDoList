import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainScreen from './Components/MainScreen/MainScreen'


export default function App() {
  const [isLoaded] = useFonts({
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold" : require("./assets/fonts/Montserrat-SemiBold.ttf")
  });
  if(!isLoaded) {
    return <AppLoading/>
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style="auto"/>
        <MainScreen/>
      </SafeAreaProvider>
    );
  }
}


import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppStack from "./src/navigations/AppStack";

SplashScreen.preventAutoHideAsync();

const AppRoot = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    Nunito: require("./assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    "Nunito Bold": require("./assets/fonts/Nunito/static/Nunito-Bold.ttf"),
  });

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }

    loadResourcesAndDataAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
};

export default App;

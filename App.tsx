import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import UnauthenticatedStack from "./src/stacks/UnauthenticatedStack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const Stack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
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
      <Stack.Navigator>
        <Stack.Screen
          name="UnauthenticatedStack"
          component={UnauthenticatedStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

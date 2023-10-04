import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UnauthenticatedStack from "./src/stacks/UnauthenticatedStack";
import ProfessorStack from "./src/stacks/ProfessorStack";
import StudentStack from "./src/stacks/StudentStack";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { ROLE } from "./src/constants/constants";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { user } = useAuth();
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
      <Stack.Navigator
        initialRouteName={
          user
            ? user.role === ROLE.PROFESSOR
              ? "StudentStack"
              : "ProfessorStack"
            : "UnauthenticatedStack"
        }
      >
        <Stack.Screen
          name="ProfessorStack"
          component={ProfessorStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentStack"
          component={StudentStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UnauthenticatedStack"
          component={UnauthenticatedStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithAuthProvider = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithAuthProvider;

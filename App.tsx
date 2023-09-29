import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import UnauthenticatedStack from "./src/stacks/UnauthenticatedStack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const App = () => {
  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
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

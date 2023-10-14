import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/Unauthenticated/SignInScreen";
import SignUpScreen from "../screens/Unauthenticated/SignUpScreen";
import PasswordRecoverScreen from "../screens/Unauthenticated/PasswordRecoverScreen";

const Stack = createStackNavigator<any>();

const UnauthenticatedStack: React.FC = () => {
  return (
    <Stack.Navigator id="UnauthenticatedStack" initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordRecover"
        component={PasswordRecoverScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedStack;

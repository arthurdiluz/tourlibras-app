import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UnauthenticatedStackParamList } from "../types/unauthenticatedStack.types";
import SignInScreen from "../screens/Unauthicated/SignInScreen";
import SignUpScreen from "../screens/Unauthicated/SignUpScreen";
import PasswordRecoverScreen from "../screens/Unauthicated/PasswordRecoverScreen";

const Stack = createStackNavigator<UnauthenticatedStackParamList>();

const UnauthenticatedStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
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

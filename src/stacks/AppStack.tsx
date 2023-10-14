import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/Unauthenticated/SignInScreen";
import SignUpScreen from "../screens/Unauthenticated/SignUpScreen";
import PasswordRecoverScreen from "../screens/Unauthenticated/PasswordRecoverScreen";
import { useAuth } from "../contexts/AuthContext";
import { ROLE } from "../enums";
import ProfessorStack from "./ProfessorStack";
import StudentStack from "./StudentStack";
import UnauthenticatedStack from "./UnauthenticatedStack";

const Stack = createStackNavigator<any>();

const AppStack: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator id="AppStack">
      {user ? (
        user.role === ROLE.PROFESSOR ? (
          <Stack.Screen
            name={"ProfessorStack"}
            component={ProfessorStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name={"StudentStack"}
            component={StudentStack}
            options={{ headerShown: false }}
          />
        )
      ) : (
        <Stack.Screen
          name={"UnauthenticatedStack"}
          component={UnauthenticatedStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;

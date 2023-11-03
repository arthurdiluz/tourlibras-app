import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UnauthenticatedStack from "./UnauthenticatedStack";
import ProfessorStack from "./ProfessorStack";
import StudentStack from "./StudentStack";
import { useAuth } from "../contexts/AuthContext";
import { ROLE } from "../enums";

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

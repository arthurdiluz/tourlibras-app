import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StudentSettingsScreen from "../screens/Student/SettingsScreen";
import StudentProfessorScreen from "../screens/Student/StudentProfessorScreen";

const Stack = createStackNavigator<any>();

const StudentSettingsStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="StudentSettingsStack"
      initialRouteName={"StudentSettings"}
    >
      <Stack.Screen
        name="StudentSettings"
        component={StudentSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentProfessor"
        component={StudentProfessorScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentSettingsStack;

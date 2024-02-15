import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorManageMedalsScreen from "../screens/Professor/ManageMedalsScreen";

const Stack = createStackNavigator<any>();

const ProfessorMedalStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="ProfessorMedalStack"
      initialRouteName="ProfessorManageMedals"
    >
      <Stack.Screen
        name="ProfessorManageMedals"
        component={ProfessorManageMedalsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorMedalStack;

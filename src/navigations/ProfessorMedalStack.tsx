import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorManageMedalsScreen from "../screens/Professor/ManageMedalsScreen";
import ProfessorUpsertMedalScreen from "../screens/Professor/UpsertMedalScreen";
import ProfessorListMedalScreen from "../screens/Professor/ListMedalScreen";

const Stack = createStackNavigator<any>();

const ProfessorMedalStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="ProfessorMedalsStack"
      initialRouteName="ProfessorManageMedals"
    >
      <Stack.Screen
        name="ProfessorManageMedals"
        component={ProfessorManageMedalsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorUpsertMedal"
        component={ProfessorUpsertMedalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorListMedal"
        component={ProfessorListMedalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorMedalStack;

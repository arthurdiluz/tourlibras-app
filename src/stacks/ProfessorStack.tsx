import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorHomepageScreen from "../screens/Professor/HomepageScreen";
import ProfessorManageLessons from "../screens/Professor/ManageLessons";

const Stack = createStackNavigator<any>();

const ProfessorStack: React.FC = () => {
  return (
    <Stack.Navigator id="ProfessorStack" initialRouteName="ProfessorHomepage">
      <Stack.Screen
        name="ProfessorHomepage"
        component={ProfessorHomepageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorManageLessons"
        component={ProfessorManageLessons}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorStack;

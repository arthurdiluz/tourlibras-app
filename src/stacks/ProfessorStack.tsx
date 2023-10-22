import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorHomepageScreen from "../screens/Professor/HomepageScreen";
import ProfessorManageLessonsScreen from "../screens/Professor/ManageLessonsScreen";
import ProfessorManageMedalsScreen from "../screens/Professor/ManageMedalsScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

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
        name="ProfessorProfile"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorManageLessons"
        component={ProfessorManageLessonsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorManageMedals"
        component={ProfessorManageMedalsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorStack;

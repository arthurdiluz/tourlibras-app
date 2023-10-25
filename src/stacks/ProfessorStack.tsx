import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorHomepageScreen from "../screens/Professor/HomepageScreen";
import ProfessorManageMedalsScreen from "../screens/Professor/ManageMedalsScreen";
import UserProfileScreen from "../screens/User/UserProfileScreen";
import UpdateUserProfileScreen from "../screens/User/UpdateUserProfileScreen";
import ProfessorLessonStack from "./ProfessorLessonStack";

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
        name="UpdateProfessorProfile"
        component={UpdateUserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorManageLessons"
        component={ProfessorLessonStack}
        options={{ headerShown: false }}
      />
      {/* TODO: refactor */}
      <Stack.Screen
        name="ProfessorManageMedals"
        component={ProfessorManageMedalsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorStack;

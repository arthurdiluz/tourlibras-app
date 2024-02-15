import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorHomepageScreen from "../screens/Professor/HomepageScreen";
import UserProfileScreen from "../screens/User/UserProfileScreen";
import UpdateUserProfileScreen from "../screens/User/UpdateUserProfileScreen";
import ProfessorLessonStack from "./ProfessorLessonStack";
import ProfessorMedalStack from "./ProfessorMedalStack";
import ProfessorStudentsScreen from "../screens/Professor/StudentsScreen";

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
        name="ProfessorLessonsStack"
        component={ProfessorLessonStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorMedalsStack"
        component={ProfessorMedalStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorStudentsStack"
        component={ProfessorStudentsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorStack;

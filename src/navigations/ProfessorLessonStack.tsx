import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorLessonHomepageScreen from "../screens/Professor/LessonHomepageScreen";
import ProfessorCreateLessonScreen from "../screens/Professor/CreateLessonScreen";

const Stack = createStackNavigator<any>();

const ProfessorLessonStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="ProfessorLessonStack"
      initialRouteName="ProfessorLessonHomepageScreen"
    >
      <Stack.Screen
        name="ProfessorLessonHomepageScreen"
        component={ProfessorLessonHomepageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorCreateLessonScreen"
        component={ProfessorCreateLessonScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorLessonStack;

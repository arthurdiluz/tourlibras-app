import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorLessonHomepageScreen from "../screens/Professor/LessonHomepageScreen";

const Stack = createStackNavigator<any>();

const ProfessorLessonStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="ProfessorLessonStack"
      initialRouteName="ProfessorLessonHomepage"
    >
      <Stack.Screen
        name="ProfessorLessonHomepage"
        component={ProfessorLessonHomepageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorLessonStack;

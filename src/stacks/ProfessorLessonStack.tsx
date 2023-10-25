import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorManageLessonsScreen from "../screens/Professor/ManageLessonsScreen";

const Stack = createStackNavigator<any>();

const ProfessorLessonStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="ProfessorLessonStack"
      initialRouteName="ProfessorLessonHomepage"
    >
      <Stack.Screen
        name="ProfessorLessonHomepage"
        component={ProfessorManageLessonsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorLessonStack;

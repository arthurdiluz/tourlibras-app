import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfessorLessonHomepageScreen from "../screens/Professor/LessonHomepageScreen";
import ProfessorUpsertLessonScreen from "../screens/Professor/UpsertLessonScreen";
import ProfessorListLevelScreen from "../screens/Professor/ListLevelScreen";

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
        name="ProfessorUpsertLessonScreen"
        component={ProfessorUpsertLessonScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessorListLevelScreen"
        component={ProfessorListLevelScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfessorLessonStack;

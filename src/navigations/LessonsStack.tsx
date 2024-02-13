import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StudentLessonsScreen from "../screens/Student/LessonsScreen";
import StudentExerciseScreen from "../screens/Student/ExerciseScreen";

const Stack = createStackNavigator<any>();

const StudentLessonsStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="StudentLessonsStack"
      initialRouteName={"StudentLessons"}
    >
      <Stack.Screen
        name="StudentLessons"
        component={StudentLessonsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentExercise"
        component={StudentExerciseScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentLessonsStack;

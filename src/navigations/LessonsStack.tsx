import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfileScreen from "../screens/User/UserProfileScreen";

const Stack = createStackNavigator<any>();

const StudentLessonsStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="StudentLessonsStack"
      initialRouteName={"StudentLessons"}
    >
      <Stack.Screen
        name="StudentLessons"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentLessonsStack;

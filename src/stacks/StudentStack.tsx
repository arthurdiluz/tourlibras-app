import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StudentHomepageScreen from "../screens/Student/HomepageScreen";

const Stack = createStackNavigator<any>();

const StudentStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="StudentHomepage">
      <Stack.Screen
        name="StudentHomepage"
        component={StudentHomepageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentStack;

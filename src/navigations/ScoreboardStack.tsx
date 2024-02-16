import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StudentScoreboardScreen from "../screens/Student/ScoreboardScreen";
import StudentFriendProfileScreen from "../screens/Student/FriendProfileScreen";

const Stack = createStackNavigator<any>();

const StudentScoreboardStack: React.FC = () => {
  return (
    <Stack.Navigator
      id="StudentScoreboardStack"
      initialRouteName={"StudentScoreboard"}
    >
      <Stack.Screen
        name="StudentScoreboard"
        component={StudentScoreboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentFriendProfile"
        component={StudentFriendProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentScoreboardStack;

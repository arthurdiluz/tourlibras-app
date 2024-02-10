import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentProfileStack from "./StudentProfileStack";
import StudentLessonsStack from "./LessonsStack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import StudentScoreboardStack from "./ScoreboardStack";

const Tab = createBottomTabNavigator<any>();

const StudentStack: React.FC = () => {
  return (
    <Tab.Navigator id="StudentStack" initialRouteName={"Profile"}>
      <Tab.Screen
        name="Profile"
        component={StudentProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={StudentLessonsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      {/* StudentScoreboardStack */}
      <Tab.Screen
        name="Scoreboard"
        component={StudentScoreboardStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default StudentStack;

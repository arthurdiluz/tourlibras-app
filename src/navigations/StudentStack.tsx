import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentProfileStack from "./StudentProfileStack";
import StudentLessonsStack from "./LessonsStack";
import { Ionicons } from "@expo/vector-icons";

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
    </Tab.Navigator>
  );
};

export default StudentStack;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentProfileStack from "./StudentProfileStack";
import StudentLessonsStack from "./LessonsStack";
import StudentScoreboardStack from "./ScoreboardStack";
import StudentStoreStack from "./StoreStack";
import StudentSettingsStack from "./SettingsStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<any>();

const StudentStack: React.FC = () => {
  return (
    <Tab.Navigator
      id="StudentStack"
      initialRouteName={"Profile"}
      screenOptions={{ tabBarShowLabel: false }}
    >
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
      <Tab.Screen
        name="Scoreboard"
        component={StudentScoreboardStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="podium-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Store"
        component={StudentStoreStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={StudentSettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
          headerShown: false,
          tabBarStyle: { backgroundColor: "#1B9CFC" },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#BFDBFE",
        }}
      />
    </Tab.Navigator>
  );
};

export default StudentStack;

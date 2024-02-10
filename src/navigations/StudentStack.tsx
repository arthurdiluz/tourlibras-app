import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentProfileStack from "./StudentProfileStack";
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
    </Tab.Navigator>
  );
};

export default StudentStack;

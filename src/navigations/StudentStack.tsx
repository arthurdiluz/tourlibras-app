import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentProfileStack from "./StudentProfileStack";

const Tab = createBottomTabNavigator<any>();

const StudentStack: React.FC = () => {
  return (
    <Tab.Navigator id="StudentStack" initialRouteName={"Profile"}>
      <Tab.Screen
        name="Profile"
        component={StudentProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default StudentStack;

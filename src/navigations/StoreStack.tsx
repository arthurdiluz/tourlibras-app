import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StudentStoreScreen from "../screens/Student/StoreScreen";

const Stack = createStackNavigator<any>();

const StudentStoreStack: React.FC = () => {
  return (
    <Stack.Navigator id="StudentStoreStack" initialRouteName={"StudentStore"}>
      <Stack.Screen
        name="StudentStore"
        component={StudentStoreScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentStoreStack;

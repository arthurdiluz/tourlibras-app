import React, { useCallback, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import UserProfileScreen from "../screens/User/UserProfileScreen";
import UpdateUserProfileScreen from "../screens/User/UpdateUserProfileScreen";
import StudentHomepageScreen from "../screens/Student/HomepageScreen";
import StudentSearchProfessorScreen from "../screens/Student/SearchProfessorScreen";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { IStudent } from "../interfaces";

const Stack = createStackNavigator<any>();

const StudentProfileStack: React.FC = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState<IStudent>();

  const init = async () => {
    const _user = (await api.get(`/user/${user?.sub}`)).data;
    const _student = (await api.get(`/student/${_user?.Student?.id}`)).data;
    setStudent(_student);
  };

  useEffect(() => {
    user && init();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      user && init();
    }, [])
  );

  if (!student) return <></>;

  return (
    <Stack.Navigator
      id="StudentProfileStack"
      initialRouteName={
        student.professorId ? "StudentHomepage" : "StudentSearchProfessorScreen"
      }
    >
      <Stack.Screen
        name="StudentProfile"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateStudentProfile"
        component={UpdateUserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentHomepage"
        component={StudentHomepageScreen}
        options={{ headerShown: false }}
        initialParams={{ studentId: student.id }}
      />
      <Stack.Screen
        name={"StudentSearchProfessorScreen"}
        component={StudentSearchProfessorScreen}
        options={{ headerShown: false }}
        initialParams={{ studentId: student.id }}
      />
    </Stack.Navigator>
  );
};

export default StudentProfileStack;

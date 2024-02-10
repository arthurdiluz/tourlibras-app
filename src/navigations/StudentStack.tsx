import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StudentHomepageScreen from "../screens/Student/HomepageScreen";
import StudentSearchProfessorScreen from "../screens/Student/SearchProfessorScreen";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/api";
import { IStudent } from "../interfaces";

const Stack = createStackNavigator<any>();

const StudentStack: React.FC = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState<IStudent>();

  useEffect(() => {
    async function fetchUser() {
      const _user = (await api.get(`/user/${user?.sub}`)).data;
      const _student = (await api.get(`/student/${_user?.Student?.id}`)).data;
      setStudent(_student);
    }

    fetchUser();
  }, [user]);

  if (!student) return <></>;

  return (
    <Stack.Navigator
      id="StudentStack"
      initialRouteName={
        student?.professorId
          ? "StudentHomepage"
          : "StudentSearchProfessorScreen"
      }
    >
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

export default StudentStack;

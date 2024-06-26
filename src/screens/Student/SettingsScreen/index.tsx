import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import styles from "./styles";
import api from "../../../utils/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../contexts/AuthContext";
import { IUserOutput } from "../../../interfaces";
import UserImageComponent from "../../../components/UserImage";
import ButtonComponent from "../../../components/Button";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const StudentSettingsScreen = ({ navigation }: Props) => {
  const { user: auth, signOut } = useAuth();

  const [user, setUser] = useState<IUserOutput>();

  const init = async () => {
    if (!auth) return;

    try {
      const _user = (await api.get(`/user/${auth?.sub}`)).data as IUserOutput;
      setUser(_user);
    } catch (error) {
      return Alert.alert(
        "Erro ao carregar dados do usuário",
        getErrorMessage(error)
      );
    }
  };

  useEffect(() => {
    auth && init();
  }, [auth]);

  const handleViewProfessor = () => navigation.navigate("StudentProfessor");

  const logOut = () => signOut();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.imageSection}>
            <UserImageComponent
              source={
                user?.profilePhoto
                  ? { uri: getMediaUrlFromS3Key(user?.profilePhoto) }
                  : undefined
              }
            />
          </View>
          <Text style={styles.userName}>{user?.fullName}</Text>
        </View>
        <View style={styles.actionButtons}>
          <ButtonComponent
            title="meu professor"
            style="primary"
            height={60}
            onPress={handleViewProfessor}
          />
          <ButtonComponent
            title="sair"
            style="warning"
            height={60}
            onPress={logOut}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StudentSettingsScreen;

import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, View } from "react-native";
import styles from "./styles";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { User } from "../../../interfaces";
import UserImageComponent from "../../../components/UserImage";
import ButtonComponent from "../../../components/Button";
import { getImageUrlFromS3Key } from "../../../utils/file";

type Props = NativeStackScreenProps<any>;

const ProfessorManageLessons = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    async function getUserData() {
      if (!user) return;

      try {
        const { data } = await api.get(`/user/${user?.sub}`);
        const { profilePhoto } = data as User;

        setProfilePicture(profilePhoto);
      } catch (error: any) {
        console.error(error);
        return Alert.alert("Could not load professor data", error?.message);
      }
    }

    getUserData();
  }, [user]);

  const handleCreateLesson = () => {};

  const handleManageLesson = () => {};

  const handleGoBack = () => {
    return navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.panelNameText}>{"Painel do Professor"}</Text>
      <View style={styles.imageSection}>
        <UserImageComponent
          source={
            profilePicture
              ? { uri: getImageUrlFromS3Key(profilePicture) }
              : undefined
          }
        />
      </View>
      <View style={styles.menuButtons}>
        <ButtonComponent title="criar aula" onPress={handleCreateLesson} />
        <ButtonComponent
          title="editar/remover aula"
          onPress={handleManageLesson}
        />
      </View>
      <View style={styles.signOutButton}>
        <ButtonComponent
          title="voltar"
          style="tertiary"
          onPress={handleGoBack}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfessorManageLessons;

import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, View } from "react-native";
import styles from "./styles";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { IUserOutput } from "../../../interfaces";
import UserImageComponent from "../../../components/UserImage";
import ButtonComponent from "../../../components/Button";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import { useFocusEffect } from "@react-navigation/native";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const ProfessorLessonHomepageScreen = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const getUserData = async () => {
    try {
      if (!user) return;
      const { data } = await api.get(`/user/${user?.sub}`);
      const { profilePhoto } = data as IUserOutput;

      setProfilePicture(profilePhoto || null);
    } catch (error) {
      return Alert.alert(
        "Erro ao carregar dados do professor",
        getErrorMessage(error)
      );
    }
  };

  useEffect(() => {
    user && getUserData();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      user && getUserData();
    }, [])
  );

  const handleCreateLesson = () => {
    return navigation.navigate("ProfessorUpsertLessonScreen");
  };

  const handleManageLesson = () => {
    return navigation.navigate("ProfessorListLevelScreen");
  };

  const handleGoBack = () => {
    return navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.panelNameText}>{"Painel do Professor"}</Text>
      <View style={styles.imageSection}>
        <UserImageComponent
          source={
            profilePicture
              ? { uri: getMediaUrlFromS3Key(profilePicture) }
              : undefined
          }
        />
      </View>
      <View style={styles.menuButtons}>
        <ButtonComponent title="criar aula" onPress={handleCreateLesson} />
        <ButtonComponent
          title="visualizar/gerenciar aulas"
          onPress={handleManageLesson}
        />
      </View>
      <View style={styles.goBackButton}>
        <ButtonComponent
          title="voltar"
          style="tertiary"
          onPress={handleGoBack}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfessorLessonHomepageScreen;

import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, View } from "react-native";
import styles from "./styles";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { IProfessor } from "../../../interfaces";
import UserImageComponent from "../../../components/UserImage";
import ButtonComponent from "../../../components/Button";
import { getImageUrlFromS3Key, uploadImage } from "../../../utils/file";

type Props = NativeStackScreenProps<any>;

const ProfessorHomepageScreen = ({ navigation }: Props) => {
  const { user, signOut } = useAuth();
  const [professor, setProfessor] = useState<IProfessor | null>(null);

  useEffect(() => {
    async function getProfessorData() {
      if (!user) throw new Error("Usuário não encontrado");

      try {
        const { Professor } = (await api.get(`/user/${user?.sub}`))?.data;
        const { data } = await api.get(`/professor/${Professor?.id}`);

        setProfessor(data as IProfessor);
      } catch (error: any) {
        return Alert.alert(
          "Não foi possível obter dados do professor",
          error?.message
        );
      }
    }

    getProfessorData();
  }, [user]);

  const handleViewProfile = () => {
    return navigation.navigate("ProfessorProfile");
  };

  const handleManageLessons = () => {
    return navigation.navigate("ProfessorManageLessons");
  };

  const handleManageMedals = () => {
    return navigation.navigate("ProfessorManageMedals");
  };

  const handleSignOut = () => {
    return signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.panelNameText}>{"Painel do Professor"}</Text>
      <View style={styles.imageSection}>
        <UserImageComponent
          source={
            professor?.User.profilePhoto
              ? { uri: getImageUrlFromS3Key(professor?.User.profilePhoto) }
              : undefined
          }
        />
      </View>
      <View style={styles.menuButtons}>
        <ButtonComponent
          title="meu perfil"
          height={60}
          onPress={handleViewProfile}
        />
        <ButtonComponent
          title="gerenciar aulas"
          height={60}
          onPress={handleManageLessons}
        />
        <ButtonComponent
          title="gerenciar medalhas"
          height={60}
          onPress={handleManageMedals}
        />
      </View>
      <View style={styles.signOutButton}>
        <ButtonComponent title="sair" style="warning" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

export default ProfessorHomepageScreen;

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

type Props = NativeStackScreenProps<any>;

const ProfessorManageMedalsScreen = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const init = async () => {
    try {
      if (!user) return;
      const { data } = await api.get(`/user/${user?.sub}`);
      const { profilePhoto } = data as IUserOutput;

      setProfilePicture(profilePhoto || null);
    } catch (error: any) {
      return Alert.alert("Could not load professor data", error?.message);
    }
  };

  useEffect(() => {
    user && init();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      user && init();
    }, [])
  );

  const handleGoBack = () => navigation.goBack();
  const handleCreateMedal = () => navigation.navigate("ProfessorUpsertMedal");
  const handleManageMedal = () => navigation.navigate("ProfessorListMedal");

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
        <ButtonComponent title="criar medalha" onPress={handleCreateMedal} />
        <ButtonComponent
          title="visualizar/gerenciar medalhas"
          onPress={handleManageMedal}
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

export default ProfessorManageMedalsScreen;

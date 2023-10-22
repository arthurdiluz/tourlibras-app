import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, View } from "react-native";
import styles from "./styles";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { Professor } from "../../../interfaces";
import UserImageComponent from "../../../components/UserImage";
import ButtonComponent from "../../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { CameraType, MediaTypeOptions } from "expo-image-picker";
import { getImageUrlFromS3Key, uploadImage } from "../../../utils/file";

type Props = NativeStackScreenProps<any>;

const ProfessorHomepageScreen = ({ navigation }: Props) => {
  const { user, token, signOut } = useAuth();
  const [professor, setProfessor] = useState<Professor | null>(null);

  useEffect(() => {
    async function getProfessorData() {
      if (!user) return;

      try {
        const { Professor } = (await api.get(`/user/${user?.sub}`))?.data;
        const { data } = await api.get(`/professor/${Professor?.id}`);

        setProfessor(data as Professor);
      } catch (error: any) {
        console.error(error);
        return Alert.alert("Could not load professor data", error?.message);
      }
    }

    getProfessorData();
  }, [user]);

  const handleUpdateImage = async () => {
    try {
      const imageOptions: ImagePicker.ImagePickerOptions = {
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [1, 1],
        cameraType: CameraType.front,
        mediaTypes: MediaTypeOptions.Images,
        quality: 1,
      };

      Alert.alert(
        "Selecionar imagem",
        "Escolha como deseja selecionar a imagem:",
        [
          {
            text: "Câmera",
            onPress: async () => {
              const cameraPermission =
                await ImagePicker.requestCameraPermissionsAsync();
              if (
                cameraPermission.status !== ImagePicker.PermissionStatus.GRANTED
              ) {
                return Alert.alert(
                  "Permissão necessária",
                  "Por favor, permita o app acessar sua câmera."
                );
              }
              const selectedImage = await ImagePicker.launchCameraAsync(
                imageOptions
              );

              if (selectedImage.assets) {
                const { uri } = selectedImage.assets[0];

                await uploadImage({
                  endpoint: `/user/${user?.sub}/profile-picture`,
                  uri,
                  token,
                })
                  .then((key) => {
                    setProfessor((prevProfessor) => {
                      return {
                        ...prevProfessor,
                        User: {
                          ...prevProfessor?.User,
                          profilePhoto: key,
                        },
                      } as Professor;
                    });
                  })
                  .catch((error: any) => {
                    console.error(error);
                    return Alert.alert(
                      "Não foi possível enviar a imagem",
                      error?.message
                    );
                  });
              }
            },
          },
          {
            text: "Galeria",
            onPress: async () => {
              const galleryPermission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

              if (
                galleryPermission.status !==
                ImagePicker.PermissionStatus.GRANTED
              ) {
                return Alert.alert(
                  "Permissão necessária",
                  "Por favor, permita o app acessar sua galeria."
                );
              }

              const selectedImage = await ImagePicker.launchImageLibraryAsync(
                imageOptions
              );

              if (selectedImage.assets) {
                const { uri } = selectedImage.assets[0];

                await uploadImage({
                  endpoint: `/user/${user?.sub}/profile-picture`,
                  uri,
                  token,
                })
                  .then((key) => {
                    setProfessor((prevProfessor) => {
                      return {
                        ...prevProfessor,
                        User: {
                          ...prevProfessor?.User,
                          profilePhoto: key,
                        },
                      } as Professor;
                    });
                  })
                  .catch((error: any) => {
                    console.error(error);
                    return Alert.alert(
                      "Não foi possível enviar a imagem",
                      error?.message
                    );
                  });
              }
            },
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert("Could not upload image", error?.message);
    }
  };

  const handleViewProfile = () => {};

  const handleManageLessons = () => {
    return navigation.navigate("ProfessorManageLessons");
  };

  const handleManageMedals = () => {};

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
          onPress={handleUpdateImage}
        />
      </View>
      <View style={styles.menuButtons}>
        <ButtonComponent title="meu perfil" onPress={handleViewProfile} />
        <ButtonComponent
          title="gerenciar aulas"
          onPress={handleManageLessons}
        />
        <ButtonComponent
          title="gerenciar medalhas"
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

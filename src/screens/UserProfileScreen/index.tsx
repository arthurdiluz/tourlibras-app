import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import styles from "./styles";
import api from "../../utils/api";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { IProfessor, IUser } from "../../interfaces";
import {
  ImagePickerOptions,
  requestCameraPermissionsAsync,
  PermissionStatus,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { CameraType, MediaTypeOptions } from "expo-image-picker";
import { getImageUrlFromS3Key, uploadImage } from "../../utils/file";
import UserImageComponent from "../../components/UserImage";
import ArrowLeftIcon from "../../components/Icons/ArrowLeftIcon";
import TextInputComponent from "../../components/input";
import { ROLE } from "../../enums";
import { Picker } from "@react-native-picker/picker";
import ButtonComponent from "../../components/Button";

type Props = NativeStackScreenProps<any>;

const UserProfileScreen = ({ navigation }: Props) => {
  const platform = Platform.OS;
  const { user: userContext, token } = useAuth();
  const grammarList = [
    { value: "SVO", label: "SVO" },
    { value: "SOV", label: "SOV" },
    { value: "VSO", label: "VSO" },
    { value: "VOS", label: "VOS" },
    { value: "OSV", label: "OSV" },
    { value: "OSV", label: "OSV" },
  ];

  const [user, setUser] = useState<IUser | null>(null);
  const [fullName, setFullname] = useState("");
  const [professor, setProfessor] = useState<IProfessor | null>(null);
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [isPickerVisible, setPickerVisible] = useState<boolean>(
    platform === "android"
  );

  useEffect(() => {
    async function getUserData() {
      if (!userContext) return navigation.navigate("UnauthenticatedStack");

      try {
        const data: IUser = (await api.get(`/user/${userContext?.sub}`)).data;

        setFullname(data.fullName);
        setUser(data);

        switch (userContext.role) {
          case "PROFESSOR":
            try {
              const { Professor } = (await api.get(`/user/${userContext.sub}`))
                ?.data;
              const professorData: IProfessor = await (
                await api.get(`/professor/${Professor?.id}`)
              ).data;

              setProfessor(professorData);
              setSelectedGrammar(professorData.grammar);
            } catch (error: any) {
              console.error(error);
              return Alert.alert(
                "Could not load professor data",
                error?.message
              );
            }
            break;

          case "STUDENT":
            // TODO: implement user case
            break;

          default:
            break;
        }
      } catch (error: any) {
        console.error(error);
        return Alert.alert("Could not load user data", error?.message);
      }
    }

    getUserData();
  }, [userContext]);

  const handleUpdateImage = async () => {
    try {
      const imageOptions: ImagePickerOptions = {
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
              const cameraPermission = await requestCameraPermissionsAsync();
              if (cameraPermission.status !== PermissionStatus.GRANTED) {
                return Alert.alert(
                  "Permissão necessária",
                  "Por favor, permita o app acessar sua câmera."
                );
              }
              const selectedImage = await launchCameraAsync(imageOptions);

              if (selectedImage.assets) {
                const { uri } = selectedImage.assets[0];

                await uploadImage({
                  endpoint: `/user/${userContext?.sub}/profile-picture`,
                  uri,
                  token,
                })
                  .then((key) => {
                    setUser((prevUser) => {
                      return {
                        ...prevUser,
                        profilePhoto: key,
                      } as IUser;
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
                await requestMediaLibraryPermissionsAsync();

              if (galleryPermission.status !== PermissionStatus.GRANTED) {
                return Alert.alert(
                  "Permissão necessária",
                  "Por favor, permita o app acessar sua galeria."
                );
              }

              const selectedImage = await launchImageLibraryAsync(imageOptions);

              if (selectedImage.assets) {
                const { uri } = selectedImage.assets[0];

                await uploadImage({
                  endpoint: `/user/${userContext?.sub}/profile-picture`,
                  uri,
                  token,
                })
                  .then((key) => {
                    setUser((prevUser) => {
                      return {
                        ...prevUser,
                        profilePhoto: key,
                      } as IUser;
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

  const handleGoBack = () => navigation.goBack();

  const handleTogglePicker = () => setPickerVisible(!isPickerVisible);

  const handleFullname = (name: string) => setFullname(name);

  const handleCredentials = () => {
    return navigation.navigate("UpdateProfessorProfile");
  };

  const handleSave = async () => {
    // TODO: add fields validation

    try {
      if (user?.role === ROLE.PROFESSOR) {
        await api.patch(`/professor/${professor?.id}`, {
          grammar: selectedGrammar,
        });
      }

      await api.patch(`/user/${userContext?.sub}`, { fullName });

      return handleGoBack();
    } catch (error: any) {
      console.error(error);
      return Alert.alert("Could not update data", error?.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        {/* TODO: fix "go back" button */}
        <View style={styles.ArrowLeft}>
          <TouchableOpacity onPress={handleGoBack}>
            <ArrowLeftIcon
              height={40}
              width={40}
              fillOpacity={0}
              stroke={"#1B9CFC"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.panelText}>{"Meu perfil"}</Text>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.imageSection}>
          <UserImageComponent
            style="secundary"
            source={
              user?.profilePhoto
                ? { uri: getImageUrlFromS3Key(user?.profilePhoto) }
                : undefined
            }
            onPress={handleUpdateImage}
          />
        </View>
        <View style={styles.inputFields}>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>{"Nome"}</Text>
            <TextInputComponent
              value={fullName}
              onChangeText={handleFullname}
              style={"secondary"}
              keyboardType={"default"}
              height={55}
              width={"100%"}
            />
          </View>
          {/* TODO: create component for grammar picker */}
          {userContext?.role === ROLE.PROFESSOR && (
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>
                {"Escolha a gramática de suas aulas"}
              </Text>
              <View style={styles.optionSectionSelect}>
                {platform === "ios" && (
                  <TouchableOpacity
                    onPress={handleTogglePicker}
                    style={styles.iosSelect}
                  >
                    <Text style={styles.iosSelectText}>
                      {selectedGrammar === "" ? "Selecione:" : selectedGrammar}
                    </Text>
                  </TouchableOpacity>
                )}
                {isPickerVisible && (
                  <Picker
                    selectedValue={selectedGrammar}
                    onValueChange={(grammar) => {
                      setSelectedGrammar(grammar);
                      platform === "ios" && handleTogglePicker();
                    }}
                  >
                    {grammarList.map((grammar, index) => (
                      <Picker.Item
                        enabled={userContext?.role === ROLE.PROFESSOR}
                        key={`grammar-${index}`}
                        label={grammar.value}
                        value={
                          userContext?.role === ROLE.PROFESSOR
                            ? grammar.value
                            : null
                        }
                      />
                    ))}
                  </Picker>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.actionButtons}>
        <ButtonComponent
          title="editar credenciais"
          style="primary"
          height={60}
          onPress={handleCredentials}
        />
        <ButtonComponent
          title="salvar"
          style="secondary"
          height={60}
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

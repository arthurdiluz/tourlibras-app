import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import styles from "./styles";
import api from "../../../utils/api";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../contexts/AuthContext";
import { IProfessor, IUserOutput } from "../../../interfaces";
import UserImageComponent from "../../../components/UserImage";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import TextInputComponent from "../../../components/input";
import { ROLE } from "../../../enums";
import ButtonComponent from "../../../components/Button";
import PickerComponent from "../../../components/PickerComponent";
import {
  uploadImageFromCamera,
  uploadImageFromGallery,
} from "../../../services/mediaUpload";
import { getMediaUrlFromS3Key } from "../../../utils/file";

type Props = NativeStackScreenProps<any>;

const UserProfileScreen = ({ navigation }: Props) => {
  const platform = Platform.OS;
  const scrollViewRef = useRef<any>(null);

  const { user: userContext, token } = useAuth();
  const grammarList = [
    { name: "SVO" },
    { name: "SOV" },
    { name: "VSO" },
    { name: "VOS" },
    { name: "OSV" },
    { name: "OSV" },
  ];

  const [user, setUser] = useState<IUserOutput | null>(null);
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
        const data: IUserOutput = (await api.get(`/user/${userContext?.sub}`))
          .data;

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
        return Alert.alert("Could not load user data", error?.message);
      }
    }

    getUserData();
  }, [userContext]);

  const handleUpdateImage = async () => {
    try {
      Alert.alert(
        "Selecionar imagem",
        "Escolha como deseja selecionar a imagem:",
        [
          {
            text: "Câmera",
            onPress: async () =>
              uploadImageFromCamera({
                uploadToAws: true,
                endpoint: `/user/${userContext?.sub}/profile-picture`,
                token,
              })
                .then((key) => {
                  if (!key) throw new Error("Erro ao enviar imagem");
                  setUser((prevUser) => {
                    return {
                      ...prevUser,
                      profilePhoto: key,
                    } as IUserOutput;
                  });
                })
                .catch((error: any) => {
                  return Alert.alert(
                    "Não foi possível enviar a imagem",
                    error?.message
                  );
                }),
          },
          {
            text: "Galeria",
            onPress: async () =>
              uploadImageFromGallery({
                uploadToAws: true,
                endpoint: `/user/${userContext?.sub}/profile-picture`,
                token,
              })
                .then((key) => {
                  if (!key) throw new Error("Erro ao enviar imagem");
                  setUser((prevUser) => {
                    return {
                      ...prevUser,
                      profilePhoto: key,
                    } as IUserOutput;
                  });
                })
                .catch((error: any) => {
                  return Alert.alert(
                    "Não foi possível enviar a imagem",
                    error?.message
                  );
                }),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Não foi possível enviar imagem", error?.message);
    }
  };

  const handleGoBack = () => navigation.goBack();

  const handleTogglePicker = () => {
    // TODO: fox scroll to end
    scrollViewRef?.current?.scrollToEnd({ animated: true });
    setPickerVisible(!isPickerVisible);
  };

  const handleFullname = (name: string) => setFullname(name);

  const handleGrammarValueChange = (grammar: string) => {
    setSelectedGrammar(grammar);
    platform === "ios" && handleTogglePicker();
  };

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
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.imageSection}>
          <UserImageComponent
            style="secondary"
            source={
              user?.profilePhoto
                ? { uri: getMediaUrlFromS3Key(user?.profilePhoto) }
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
          <Text style={styles.inputLabel}>
            {"Escolha a gramática de suas aulas"}
          </Text>
          <PickerComponent
            height={60}
            width={"100%"}
            style={"secondary"}
            optionsList={grammarList}
            onPickerPress={handleTogglePicker}
            selectedOption={selectedGrammar}
            isPickerVisible={isPickerVisible}
            onValueChange={handleGrammarValueChange}
          />
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

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import styles from "./styles";
import api from "../../../utils/api";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../contexts/AuthContext";
import { IProfessor, IStudent, IUserOutput } from "../../../interfaces";
import UserImageComponent from "../../../components/UserImage";
import { Ionicons } from "@expo/vector-icons";
import TextInputComponent from "../../../components/input";
import { ROLE } from "../../../enums";
import ButtonComponent from "../../../components/Button";
import PickerComponent from "../../../components/PickerComponent";
import {
  uploadImageFromCamera,
  uploadImageFromGallery,
} from "../../../services/mediaUpload";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import { useFocusEffect } from "@react-navigation/native";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const UserProfileScreen = ({ navigation }: Props) => {
  const platform = Platform.OS;
  const grammarList = [
    { name: "SVO" },
    { name: "SOV" },
    { name: "VSO" },
    { name: "VOS" },
    { name: "OSV" },
    { name: "OSV" },
  ];

  const { user: userContext, token } = useAuth();
  const scrollViewRef = useRef<any>(null);

  const [user, setUser] = useState<IUserOutput>();
  const [professor, setProfessor] = useState<IProfessor>();
  const [student, setStudent] = useState<IStudent>();
  const [fullName, setFullName] = useState("");
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [isPickerVisible, setPickerVisible] = useState<boolean>(
    platform === "android"
  );

  const getUserData = async () => {
    if (!userContext) return navigation.navigate("UnauthenticatedStack");

    try {
      const data: IUserOutput = (await api.get(`/user/${userContext?.sub}`))
        .data;

      setFullName(data.fullName);
      setUser(data);

      switch (userContext.role) {
        case ROLE.PROFESSOR:
          try {
            const { Professor } = (await api.get(`/user/${userContext.sub}`))
              ?.data;
            const professorData: IProfessor = (
              await api.get(`/professor/${Professor?.id}`)
            ).data;

            setProfessor(professorData);
            setSelectedGrammar(professorData.grammar);
          } catch (error) {
            return Alert.alert(
              "Erro ao carregar os dados do professor",
              getErrorMessage(error)
            );
          }
          break;

        case ROLE.STUDENT:
          const { Student } = await (
            await api.get(`/user/${userContext.sub}`)
          )?.data;
          const studentData: IStudent = await (
            await api.get(`/student/${Student.id}`)
          ).data;
          setStudent(studentData);
          break;

        default:
          break;
      }
    } catch (error) {
      return Alert.alert(
        "Erro ao carregar os dados do usuário",
        getErrorMessage(error)
      );
    }
  };

  useEffect(() => {
    userContext && getUserData();
  }, [userContext]);

  useFocusEffect(
    useCallback(() => {
      userContext && getUserData();
    }, [])
  );

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
                endpoint: `/user/${user?.id}/profile-picture`,
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
                endpoint: `/user/${user?.id}/profile-picture`,
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
    } catch (error) {
      return Alert.alert("Erro ao enviar imagem", getErrorMessage(error));
    }
  };

  const handleGoBack = () => navigation.goBack();

  const handleTogglePicker = () => {
    // TODO: fix scroll to end
    scrollViewRef?.current?.scrollToEnd({ animated: true });
    setPickerVisible(!isPickerVisible);
  };

  const handleFullName = (name: string) => setFullName(name);

  const handleGrammarValueChange = (grammar: string) => {
    setSelectedGrammar(grammar);
    platform === "ios" && handleTogglePicker();
  };

  const handleCredentials = () => {
    return navigation.navigate(
      user?.role === ROLE.PROFESSOR
        ? "UpdateProfessorProfile"
        : "UpdateStudentProfile"
    );
  };

  const handleSave = async () => {
    // TODO: add fields validation

    try {
      if (user?.role === ROLE.PROFESSOR) {
        await api.patch(`/professor/${professor?.id}`, {
          grammar: selectedGrammar,
        });
      }

      await api.patch(`/user/${user?.id}`, { fullName });

      return handleGoBack();
    } catch (error) {
      return Alert.alert(
        "Erro ao atualizar seus dados",
        getErrorMessage(error)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.ArrowLeft}>
          <Ionicons
            name="arrow-back"
            size={32}
            color={"#1B9CFC"}
            onPress={handleGoBack}
          />
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
              onChangeText={handleFullName}
              style={"secondary"}
              keyboardType={"default"}
              height={55}
              width={"100%"}
            />
          </View>
          {user?.role === ROLE.PROFESSOR && (
            <>
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
            </>
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

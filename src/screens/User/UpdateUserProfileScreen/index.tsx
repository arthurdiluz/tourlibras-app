import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, View } from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import TextInputComponent from "../../../components/input";
import ButtonComponent from "../../../components/Button";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../utils/api";
import { IUserOutput } from "../../../interfaces";

type Props = NativeStackScreenProps<any>;

const UpdateUserProfileScreen = ({ navigation }: Props) => {
  const { user: _user } = useAuth();

  const [user, setUser] = useState<IUserOutput | null>(null);
  const [newEmail, setNewEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");

  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await api.get(`/user/${_user?.sub}`);
        const data: IUserOutput = response?.data;

        setNewEmail(data.email);
        setUser(data);
      } catch (error: any) {
        return Alert.alert("Could not load user data", error?.message);
      }
    }

    loadUserData();
  }, [_user]);

  const handleGoBack = () => navigation.goBack();

  const handleEmailChange = (text: string) => setNewEmail(text);
  const handleCurrentPassword = (text: string) => setCurrentPassword(text);
  const handleNewPassword = (text: string) => setNewPassword(text);
  const handleNewPasswordConfirm = (text: string) =>
    setNewPasswordConfirm(text);

  const handleDeleteAccount = async () => {
    try {
      Alert.alert(
        "Apagar conta",
        "Deseja apagar sua conta? Esta ação é irreversível.",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Apagar conta",
            style: "destructive",
            onPress: () => {
              Alert.prompt(
                "Confirme a ação",
                'Digite "apagar conta" para deletar sua conta',
                async (text: string) => {
                  if (text !== "apagar conta") {
                    return Alert.alert(
                      "Ação cancelada",
                      "O texto digitado é inválido"
                    );
                  }
                  try {
                    return await api.delete(`/user/${user?.id}`);
                  } catch (error: any) {
                    return Alert.alert(
                      "Could not delete your account",
                      error?.message
                    );
                  }
                }
              );
            },
          },
        ]
      );
    } catch (error: any) {
      return Alert.alert("Could not delete your account", error?.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const data: { email?: string; password?: string } = {};

      if (newEmail !== user?.email) {
        // TODO: add email validations
        data["email"] = newEmail;
      }

      if (newPassword.length) {
        // TODO: add password validations
        data["password"] = newPassword;
      }

      Object.keys(data).length && (await api.patch(`/user/${user?.id}`, data));

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
        <Text style={styles.panelText}>{"email e senha"}</Text>
      </View>
      <View style={styles.emailSection}>
        <Text style={styles.emailSectionText}>{"Alterar email"}</Text>
        <TextInputComponent
          value={newEmail}
          onChangeText={handleEmailChange}
          style={"secondary"}
          height={55}
          width={"100%"}
          keyboardType={"email-address"}
          placeholder={"Digite seu email"}
        />
      </View>
      <View style={styles.passwordSection}>
        <Text style={styles.passwordSectionText}>{"Alterar senha"}</Text>
        <Text style={styles.passwordSectionTextTip}>
          {"• Sua senha deve conter no mínimo 8 caracteres."}
        </Text>
        <Text style={styles.passwordSectionTextTip}>
          {"• Utilize uma combinação de letras maiúsculas e minúsculas."}
        </Text>
        <TextInputComponent
          value={currentPassword}
          onChangeText={handleCurrentPassword}
          style={"secondary"}
          height={55}
          width={"100%"}
          keyboardType={"default"}
          placeholder={"Senha atual"}
          secureTextEntry={true}
        />
        <TextInputComponent
          value={newPassword}
          onChangeText={setNewPassword}
          style={"secondary"}
          height={55}
          width={"100%"}
          keyboardType={"default"}
          placeholder={"Nova senha"}
          secureTextEntry={true}
        />
        <TextInputComponent
          value={newPasswordConfirm}
          onChangeText={setNewPasswordConfirm}
          style={"secondary"}
          height={55}
          width={"100%"}
          keyboardType={"default"}
          placeholder={"Confirmar nova senha"}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.actionButtons}>
        <ButtonComponent
          title={"apagar conta"}
          style={"warning"}
          height={60}
          width={"100%"}
          onPress={handleDeleteAccount}
        />
        <ButtonComponent
          title={"salvar"}
          style={"secondary"}
          height={60}
          width={"100%"}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default UpdateUserProfileScreen;

import React, { useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import {
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./styles";
import api from "../../../utils/api";
import UserCircleIcon from "../../../components/Icons/UserCircleIcon";
import TextInputComponent from "../../../components/input";
import IonIcons from "react-native-vector-icons/Ionicons";
import ButtonComponent from "../../../components/Button";
import PickerComponent from "../../../components/PickerComponent";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any>;

const SignUpScreen = ({ navigation }: Props) => {
  const platform = Platform.OS;
  const { signIn } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isProfessor, setIsProfessor] = useState(false);
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const grammarList = [
    { name: "SVO" },
    { name: "SOV" },
    { name: "VSO" },
    { name: "VOS" },
    { name: "OSV" },
    { name: "OSV" },
  ];

  const handleGoBack = () => navigation.goBack();
  const handleFullName = (text: string) => setFullName(text);
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);
  const [isPickerVisible, setPickerVisible] = useState(platform === "android");

  const handleTogglePasswordVisibility = () => {
    setPasswordHidden(!isPasswordHidden);
  };

  const handleToggleUserRole = () => {
    if (isProfessor) handleChangeSelectedGrammar("");
    setIsProfessor(!isProfessor);
  };

  const handleChangeSelectedGrammar = (value: string) => {
    setSelectedGrammar(value);
  };

  const handleTogglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleGrammarValueChange = (grammar: string) => {
    setSelectedGrammar(grammar);
    platform === "ios" && handleTogglePicker();
  };

  const handleProfessorSignUp = async () => {
    try {
      await api.post("/user/professor", {
        fullName,
        email,
        password,
        grammar: selectedGrammar,
        profilePhoto: null,
      });

      const { data } = await api.post("auth/local/signin", {
        email,
        password,
      });

      const accessToken = data?.accessToken as string;

      return signIn(accessToken);
    } catch (error: any) {
      return Alert.alert("Não foi possível criar usuário", error?.message);
    }
  };

  const handleStudentSignUp = async () => {
    try {
      await api.post("/user/student", {
        fullName,
        email,
        password,
        profilePhoto: undefined,
      });

      const { data } = await api.post("auth/local/signin", {
        email,
        password,
      });

      const accessToken = data?.accessToken as string;

      return signIn(accessToken);
    } catch (error: any) {
      return Alert.alert("Não foi possível criar usuário", error?.message);
    }
  };

  const handleSignUp = () => {
    // TODO: validate inputs
    return isProfessor ? handleProfessorSignUp() : handleStudentSignUp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.ArrowLeft}>
          <Ionicons
            name="arrow-back"
            size={32}
            color={"white"}
            onPress={handleGoBack}
          />
        </View>
        <View style={styles.userCircle}>
          <UserCircleIcon height={140} width={140} fillOpacity={0} />
        </View>
        <View style={styles.signUpSection}>
          <Text style={styles.signUpSectionText}>
            {"Crie uma conta com seu email e senha"}
          </Text>
          <View style={styles.inputFields}>
            <TextInputComponent
              placeholder="Digite seu nome completo"
              value={fullName}
              onChangeText={handleFullName}
              height={60}
              width={"100%"}
              style="primary"
            />
            <TextInputComponent
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
              height={60}
              width={"100%"}
              style="primary"
            />
            <View style={styles.passwordInputContainer}>
              <TextInputComponent
                placeholder="Digite sua senha"
                value={password}
                onChangeText={handlePasswordChange}
                height={60}
                width={"100%"}
                style="primary"
                customStyle={{ paddingRight: "15%" }}
                secureTextEntry={isPasswordHidden}
              />
              <TouchableOpacity
                onPress={handleTogglePasswordVisibility}
                style={styles.passwordToggle}
              >
                <IonIcons
                  name={isPasswordHidden ? "eye-off" : "eye"}
                  size={20}
                  color={"#FFF"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.roleToggleSection}>
            <Switch
              trackColor={{ false: "#CBD5E1", true: "#1B1464" }}
              thumbColor={"#FFF"}
              onValueChange={handleToggleUserRole}
              value={isProfessor}
            />
            <Text style={styles.roleToggleSectionText}>{"Sou professor"}</Text>
          </View>
          {isProfessor && (
            <View style={styles.professorOptionSection}>
              <Text style={styles.professorOptionSectionText}>
                {"Informe a gramática utilizada em suas aulas"}
              </Text>
              <PickerComponent
                height={60}
                optionsList={grammarList}
                onPickerPress={handleTogglePicker}
                selectedOption={selectedGrammar}
                isPickerVisible={isPickerVisible}
                onValueChange={handleGrammarValueChange}
                isItemEnabled={isProfessor}
                style={"primary"}
              />
            </View>
          )}
          <View style={styles.buttonSection}>
            <ButtonComponent
              title="cadastrar-se"
              style="primary"
              height={60}
              width={"100%"}
              onPress={handleSignUp}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

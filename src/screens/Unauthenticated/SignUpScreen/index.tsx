import React, { useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import {
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "./styles";
import UserCircleIcon from "../../../components/Icons/UserCircleIcon";
import TextInputComponent from "../../../components/input";
import IonIcons from "react-native-vector-icons/Ionicons";
import ButtonComponent from "../../../components/Button";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../utils/api";

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
    { value: "SVO", label: "SVO" },
    { value: "SOV", label: "SOV" },
    { value: "VSO", label: "VSO" },
    { value: "VOS", label: "VOS" },
    { value: "OSV", label: "OSV" },
    { value: "OSV", label: "OSV" },
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
      console.error(error);
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
      console.error(error);
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
          <TouchableOpacity onPress={handleGoBack}>
            <ArrowLeftIcon height={40} width={40} fillOpacity={0} />
          </TouchableOpacity>
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
              <View style={styles.professorOptionSectionSelect}>
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
                        enabled={isProfessor}
                        key={`grammar-${index}`}
                        label={grammar.value}
                        value={isProfessor ? grammar.value : null}
                      />
                    ))}
                  </Picker>
                )}
              </View>
            </View>
          )}
          <View style={styles.buttonSection}>
            <ButtonComponent
              title="Cadastrar-se"
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
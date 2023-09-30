import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import {
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCircleIcon from "../../components/Icons/UserCircleIcon";
import TextInputComponent from "../../components/input";
import { UnauthenticatedStackParamList } from "../../types/unauthenticatedStack.types";
import styles from "./styles";
import IonIcons from "react-native-vector-icons/Ionicons";
import ButtonComponent from "../../components/Button";
import ArrowLeftIcon from "../../components/Icons/ArrowLeftIcon";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";

type Props = NativeStackScreenProps<UnauthenticatedStackParamList>;

const SignUpScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isProfessor, setIsProfessor] = useState(false);
  const [grammar, setGrammar] = useState("");
  const grammerSelectOptions = [
    { key: 1, value: "SVO", label: "SVO" },
    { key: 2, value: "SOV", label: "SOV" },
    { key: 3, value: "VSO", label: "VSO" },
    { key: 4, value: "VOS", label: "VOS" },
    { key: 5, value: "OSV", label: "OSV" },
    { key: 6, value: "OSV", label: "OSV" },
  ];

  const handleGoBack = () => navigation.goBack();
  const handleFullName = (text: string) => setFullName(text);
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  const handleTogglePasswordVisibility = () => {
    setPasswordHidden(!isPasswordHidden);
  };

  const handleToggleUserRole = () => {
    if (isProfessor) handleChangeSelectedGrammar("");
    setIsProfessor(!isProfessor);
  };

  const handleChangeSelectedGrammar = (value: string) => {
    setGrammar(value);
  };

  const handleSignUp = () => {
    // TODO: create user
    // TODO: navigate to the User/Professor stack homepage

    return isProfessor
      ? {
          fullName,
          email,
          password,
          grammar,
          profilePhoto: null,
        }
      : {
          fullName,
          email,
          password,
          profilePhoto: null,
        };
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
                onSubmitEditing={handleSignUp}
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
                <RNPickerSelect
                  items={grammerSelectOptions}
                  onValueChange={(value) => handleChangeSelectedGrammar(value)}
                  doneText={"Selectionar"}
                  placeholder={{
                    label: "Escolha sua gramática",
                  }}
                />
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

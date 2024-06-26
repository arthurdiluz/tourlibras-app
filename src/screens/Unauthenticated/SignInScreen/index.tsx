import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import TextInputComponent from "../../../components/input";
import UserCircleIcon from "../../../components/Icons/UserCircleIcon";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../../../components/Button";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../utils/api";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const SignInScreen = ({ navigation }: Props) => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  const handeTogglePasswordVisibility = () => {
    setPasswordHidden(!isPasswordHidden);
  };

  const handleForgetPassword = () => {
    return navigation.navigate("PasswordRecover", { email });
  };

  const handleSignIn = async () => {
    try {
      // TODO: validate credentials
      const { data } = await api.post("auth/local/signin", {
        email,
        password,
      });

      const accessToken = data?.accessToken as string;

      return signIn(accessToken);
    } catch (error) {
      return Alert.alert("Erro ao entrar", getErrorMessage(error));
    }
  };

  const handleSignUp = () => navigation.navigate("SignUp");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userCircle}>
        <UserCircleIcon height={140} width={140} fillOpacity={0} />
      </View>
      <View style={styles.signInSection}>
        <Text style={styles.signInSectionText}>{"Entre com a sua conta"}</Text>
        <View style={styles.inputFields}>
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
              onSubmitEditing={handleSignIn}
              height={60}
              width={"100%"}
              style="primary"
              customStyle={{ paddingRight: "15%" }}
              secureTextEntry={isPasswordHidden}
            />
            <TouchableOpacity
              onPress={handeTogglePasswordVisibility}
              style={styles.passwordToggle}
            >
              <Ionicons
                name={isPasswordHidden ? "eye-off" : "eye"}
                size={20}
                color={"#FFF"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={styles.forgotPasswordText}>{"Esqueceu sua senha?"}</Text>
        </TouchableOpacity>
        <View style={styles.buttonsSection}>
          <ButtonComponent
            title="Entrar"
            style="primary"
            height={60}
            width={"100%"}
            onPress={handleSignIn}
          />
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>{"Criar uma conta"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

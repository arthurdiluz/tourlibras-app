import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputComponent from "../../components/input";
import UserCircleIcon from "../../components/Icons/UserCircleIcon";
import styles from "./styles";
import IonIcons from "react-native-vector-icons/Ionicons";
import ButtonComponent from "../../components/Button";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handleEmailChange = (text: string) => setEmail(text);

  const handlePasswordChange = (text: string) => setPassword(text);

  const handeTogglePasswordVisibility = () => {
    setPasswordHidden(!isPasswordHidden);
  };

  const handleForgetPassword = () => {
    // TODO: navigate to ForgotPasswordScreen; send the email
    return Alert.alert("You forgot your password", "Try to remember it");
  };

  const handleSignIn = () => {
    // TODO: validate credentials
    // TODO: navigate to Student/Professor stack
    return Alert.alert("Auth", "You will sign in");
  };

  const handleSignUp = () => {
    // TODO: navigate to ForgotPasswordScreen; send the email
    return Alert.alert("Auth", "You will sign up");
  };

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
              height={60}
              width={"100%"}
              style="primary"
              customStyle={{ paddingRight: "20%" }}
              secureTextEntry={isPasswordHidden}
            />
            <TouchableOpacity
              onPress={handeTogglePasswordVisibility}
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

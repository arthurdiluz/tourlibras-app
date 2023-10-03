import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "../../../components/Button";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import KeyIcon from "../../../components/Icons/KeyIcon";
import TextInputComponent from "../../../components/input";
import { UnauthenticatedStackParamList } from "../../../types/unauthenticatedStack.types";
import styles from "./styles";

type Props = NativeStackScreenProps<UnauthenticatedStackParamList>;

const PasswordRecoverScreen = ({ navigation, route }: Props) => {
  const { email: routeEmail } = (route.params as { email: string }) || {
    email: "",
  };

  const [email, setEmail] = useState(routeEmail);

  const handleGoBack = () => {
    return navigation.goBack();
  };

  const handleSubmit = () => {
    if (email === "") {
      return Alert.alert("Missing e-mail", "Please fill the email field");
    }

    return Alert.alert("Email sent", "Check your inbox to recover password");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ArrowLeft}>
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeftIcon height={40} width={40} fillOpacity={0} />
        </TouchableOpacity>
      </View>
      <View style={styles.firstSection}>
        <KeyIcon height={76} width={76} />
        <Text style={styles.firstSectionText}>{"Esqueceu a sua senha?"}</Text>
      </View>
      <View style={styles.secondSection}>
        <Text style={styles.secondSectionText}>{"Não se preocupe,"}</Text>
        <Text style={styles.secondSectionText}>
          {"te ajudamos a recuperar :D"}
        </Text>
      </View>
      <View style={styles.thirdSection}>
        <TextInputComponent
          height={60}
          width={"100%"}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={handleSubmit}
        />
        <ButtonComponent
          title="Recuperar Senha"
          height={60}
          width={"100%"}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecoverScreen;

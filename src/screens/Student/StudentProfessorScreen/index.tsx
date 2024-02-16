import { useCallback, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { IProfessor, IStudent, IUserOutput } from "../../../interfaces";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import UserImageComponent from "../../../components/UserImage";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import CardComponent from "../../../components/CardComponent";
import { Ionicons, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import ButtonComponent from "../../../components/Button";
import { isAvailableAsync, composeAsync } from "expo-mail-composer";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const StudentProfessorScreen = ({ navigation }: Props) => {
  const { user, signOut } = useAuth();

  const [student, setStudent] = useState<IStudent>();
  const [professor, setProfessor] = useState<IProfessor>();

  const init = async () => {
    try {
      if (!user) return;

      const { Student } = (await api.get(`/user/${user.sub}`))
        .data as IUserOutput;

      const _student = (await api.get(`/student/${Student?.id}`))
        .data as IStudent;

      const _professor = (await api.get(`/professor/${_student?.professorId}`))
        .data as IProfessor;

      setStudent(_student);
      setProfessor(_professor);
    } catch (error) {
      return Alert.alert(
        "Erro ao carregar os dados do usuário",
        getErrorMessage(error)
      );
    }
  };

  useEffect(() => {
    init();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  const handleGoBack = () => navigation.goBack();

  const handleLeaveProfessor = () => {
    const leaveProfessor = async () => {
      if (!student || !professor) return;
      try {
        await api.delete(`/student/${student.id}/professor/${professor.id}`);
        return signOut();
      } catch (error) {
        return Alert.alert("Erro ao sair da turma", getErrorMessage(error));
      }
    };

    Alert.alert(
      "Sair da turma",
      `Tem certeza que deseja sair da turma do professor ${professor?.User?.fullName}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
          isPreferred: true,
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: leaveProfessor,
        },
      ]
    );
  };

  const sendEmail = async () => {
    try {
      if (!(await isAvailableAsync())) {
        throw Error("Cliente de email não encontrado");
      }

      return await composeAsync({
        subject: `Tourlibras: Aluno ${student?.User.fullName}`,
        recipients: [professor?.User?.email || "arthurdiluz@outlook.com"],
      });
    } catch (error) {
      return Alert.alert("Erro ao enviar e-mail", getErrorMessage(error));
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
        <Text style={styles.topMenuText}>{"meu professor"}</Text>
      </View>
      <View style={styles.professorSection}>
        <View style={styles.professorSectionLeft}>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={styles.professorSectionLeftText1}>
              {professor?.User.fullName}
            </Text>
            <View style={{ gap: 8 }}>
              <Text style={styles.professorSectionLeftText2}>
                {professor?.createdAt &&
                  `Entrou em ${formatRelative(
                    professor?.createdAt,
                    new Date(),
                    {
                      locale: ptBR,
                    }
                  )}`}
              </Text>
              <Text style={styles.professorSectionLeftText3}>
                {professor?.grammar &&
                  `Ensinando Libras com ${professor.grammar}`}
              </Text>
            </View>
          </View>
          <ButtonComponent
            title="Sair da turma"
            style="warning"
            height={48}
            onPress={handleLeaveProfessor}
            customStyle={{ borderRadius: 16 }}
          />
        </View>
        <View style={styles.professorSectionRight}>
          <View style={{ height: 144, width: 144 }}>
            <UserImageComponent
              style={"secondary"}
              source={
                professor?.User?.profilePhoto
                  ? { uri: getMediaUrlFromS3Key(professor.User.profilePhoto) }
                  : undefined
              }
            />
          </View>
        </View>
      </View>
      <View style={styles.statisticSection}>
        <Text style={styles.sectionTitle}>{"Estatísticas"}</Text>
        <View style={styles.statisticSectionCards}>
          <CardComponent
            style="primary"
            customStyle={styles.statisticSectionCard}
          >
            <MaterialIcons name={"people-outline"} size={38} />
            <View style={styles.statisticSectionCardContent}>
              <Text style={styles.statisticSectionCardContentNumber}>
                {professor?.Students?.length ?? 0}
              </Text>
              <Text style={styles.statisticSectionCardContentText}>
                {"Alunos"}
              </Text>
            </View>
          </CardComponent>
          <CardComponent
            style="primary"
            customStyle={styles.statisticSectionCard}
          >
            <Feather name={"book-open"} size={38} />
            <View style={styles.statisticSectionCardContent}>
              <Text style={styles.statisticSectionCardContentNumber}>
                {professor?.Lessons?.length ?? 0}
              </Text>
              <Text style={styles.statisticSectionCardContentText}>
                {"Aulas"}
              </Text>
            </View>
          </CardComponent>
        </View>
      </View>
      <View style={styles.emailSection}>
        <ButtonComponent
          title="Enviar e-email"
          style={"secondary"}
          onPress={sendEmail}
        />
      </View>
    </SafeAreaView>
  );
};

export default StudentProfessorScreen;

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import TextInputComponent from "../../../components/input";
import UserImageComponent from "../../../components/UserImage";
import { IProfessor, IStudent, IUserOutput } from "../../../interfaces";
import { STUDENT_SORT_BY } from "../../../enums";
import styles from "./styles";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const ProfessorStudentsScreen = ({ navigation }: Props) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [professor, setProfessor] = useState<IProfessor>();
  const [students, setStudents] = useState<IStudent[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<STUDENT_SORT_BY>(
    STUDENT_SORT_BY.Experience
  );

  const handleChangeSearch = (text: string) => setSearch(text);
  const handleChangeSortBy = (newSortBy: STUDENT_SORT_BY) => {
    if (sortBy !== newSortBy) setSortBy(newSortBy);
  };

  const init = async () => {
    try {
      setLoading(true);

      const { Professor } = (await api.get(`/user/${user?.sub}`))
        .data as IUserOutput;

      const _professor = (await api.get(`/professor/${Professor?.id}`))
        .data as IProfessor;

      const _students = (
        await api.get(`/student/`, {
          params: { professorId: _professor.id, sortBy, search },
        })
      ).data as IStudent[];

      setStudents(_students);
      setProfessor(_professor);
      setLoading(false);
    } catch (error) {
      return Alert.alert("Erro ao buscar estudantes", getErrorMessage(error));
    }
  };

  useEffect(() => {
    user && init();
  }, [user, sortBy, search]);

  const handleGoBack = () => navigation.goBack();

  const handleRemoveStudent = (student: IStudent) => {
    const removeStudent = async () => {
      if (!student || !professor) return;

      try {
        await api.delete(`/professor/${professor.id}/student/${student.id}`);
        setStudents((prev) => prev.filter((s) => s.id !== student.id));
      } catch (error) {
        return Alert.alert("Erro ao sair da turma", getErrorMessage(error));
      }
    };

    Alert.alert(
      `Aluno ${student.User.fullName} selecionado`,
      "Tem certeza que deseja remover este aluno?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          isPreferred: true,
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: removeStudent,
        },
      ]
    );
  };

  const listHeaderComponent = () => {
    return (
      <View style={styles.listHeaderComponent}>
        <View style={styles.listHeaderComponentButtons}>
          <TouchableHighlight
            underlayColor={"#0091FF"}
            onPress={() => handleChangeSortBy(STUDENT_SORT_BY.Experience)}
            style={[
              { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
              styles.listHeaderComponentButton,
              sortBy === STUDENT_SORT_BY.Experience
                ? styles.listHeaderComponentActiveButton
                : styles.listHeaderComponentInactiveButton,
            ]}
          >
            <Text
              style={[
                styles.listHeaderComponentButtonText,
                sortBy === STUDENT_SORT_BY.Experience && { color: "white" },
              ]}
            >
              {"Experiência"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#0091FF"}
            onPress={() => handleChangeSortBy(STUDENT_SORT_BY.Money)}
            style={[
              { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
              styles.listHeaderComponentButton,
              sortBy === STUDENT_SORT_BY.Money
                ? styles.listHeaderComponentActiveButton
                : styles.listHeaderComponentInactiveButton,
            ]}
          >
            <Text
              style={[
                styles.listHeaderComponentButtonText,
                sortBy === STUDENT_SORT_BY.Money && { color: "white" },
              ]}
            >
              {"Dinheiro"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<IStudent>) => {
    return (
      <TouchableHighlight
        underlayColor={"#F8FAFC"}
        onPress={() => handleRemoveStudent(item)}
        disabled={user?.sub === item.userId}
      >
        <View style={styles.card} key={index}>
          <Text style={styles.cardIndex}>{index + 1}</Text>
          <View style={styles.cardPhoto}>
            <UserImageComponent
              style={"secondary"}
              source={
                item?.User?.profilePhoto
                  ? { uri: getMediaUrlFromS3Key(item.User.profilePhoto) }
                  : undefined
              }
            />
          </View>
          <View style={styles.cardMiddle}>
            <Text style={styles.cardMiddleText}>{item.User.fullName}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardMetricsItemsText}>
              {sortBy === STUDENT_SORT_BY.Experience
                ? `${item.experience} XP`
                : `$ ${item.money}`}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
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
        <Text style={styles.panelText}>{"Meus alunos"}</Text>
      </View>
      <View style={styles.flexContainer}>
        <TextInputComponent
          height={50}
          width={"100%"}
          placeholder={"Pesquise pelo nome do aluno"}
          style={"secondary"}
          customStyle={styles.inputCustomStyle}
          value={search}
          onChangeText={handleChangeSearch}
          onSubmitEditing={() => {}}
        />
        {!!loading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={students}
            renderItem={renderItem}
            style={styles.flatListContainer}
            keyExtractor={({ id }) => id.toString()}
            ListHeaderComponent={listHeaderComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfessorStudentsScreen;

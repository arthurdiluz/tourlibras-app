import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import TextInputComponent from "../../../components/input";
import { GRAMMAR, PROFESSOR_SORT_BY } from "../../../enums";
import { IProfessor, IStudent } from "../../../interfaces";
import api from "../../../utils/api";
import PickerComponent from "../../../components/PickerComponent";
import styles from "./styles";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import UserImageComponent from "../../../components/UserImage";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<any>;

const StudentSearchProfessorScreen = ({ navigation, route }: Props) => {
  const os = Platform.OS;
  const studentId = route.params?.studentId;
  const grammarList = [
    { name: "SVO" },
    { name: "SOV" },
    { name: "VSO" },
    { name: "VOS" },
    { name: "OSV" },
    { name: "OSV" },
  ];

  const [student, setStudent] = useState<IStudent>();
  const [search, setSearch] = useState<string>("");
  const [grammar, setGrammar] = useState<GRAMMAR>();
  const [sortBy, setSortBy] = useState<PROFESSOR_SORT_BY>(
    PROFESSOR_SORT_BY.Students
  );
  const [professors, setProfessors] = useState<Array<IProfessor>>([]);
  const [isPickerVisible, setPickerVisible] = useState(os === "android");

  const handleGoBack = () => {}; // TODO: add navigation handler
  const handleChangeSearch = (text: string) => setSearch(text);
  const handleTogglePicker = () => setPickerVisible((prev) => !prev);

  const handleChangeSortBy = (newSortBy: PROFESSOR_SORT_BY) => {
    if (sortBy !== newSortBy) setSortBy(newSortBy);
  };

  const handleGrammarValueChange = (grammar: GRAMMAR) => {
    setGrammar(grammar);
    os === "ios" && handleTogglePicker();
  };

  const handleJoinProfessor = (professor: IProfessor) => {
    return Alert.alert(
      `Professor ${professor?.User?.fullName} selecionado`,
      "Confirma inscrição na turma deste professor?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          style: "default",
          isPreferred: true,
          onPress: async () => {
            try {
              await api.post(`/student/${studentId}/professor/${professor.id}`);
              return navigation.navigate("StudentHomepage", { studentId });
            } catch (error: any) {
              Alert.alert("Não foi possível entrar na turma", error?.message);
            }
          },
        },
      ]
    );
  };

  const fetchStudent = async () => {
    try {
      const _student = (await api.get(`/student/${studentId}`))
        .data as IStudent;
      setStudent(_student);
    } catch (error: any) {
      return Alert.alert("Erro ao buscar dados", error?.message);
    }
  };

  const fetchProfessors = async () => {
    const _professors = (
      await api.get("/professor", {
        params: { search, grammar, sortBy },
      })
    ).data as Array<IProfessor>;
    setProfessors(_professors);
  };

  useEffect(() => {
    studentId && fetchStudent();
  }, [studentId]);

  useEffect(() => {
    studentId && fetchProfessors();
  }, [search, grammar, sortBy]);

  useFocusEffect(
    useCallback(() => {
      studentId && fetchStudent();
      studentId && fetchProfessors();
      console.log("fetch");
    }, [studentId, search, grammar, sortBy])
  );

  const listHeaderComponent = () => {
    return (
      <View style={styles.listHeaderComponent}>
        <View style={styles.listHeaderComponentButtons}>
          <TouchableHighlight
            underlayColor={"#0091FF"}
            onPress={() => handleChangeSortBy(PROFESSOR_SORT_BY.Students)}
            style={[
              { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
              styles.listHeaderComponentButton,
              sortBy === PROFESSOR_SORT_BY.Students
                ? styles.listHeaderComponentActiveButton
                : styles.listHeaderComponentInactiveButton,
            ]}
          >
            <Text
              style={[
                styles.listHeaderComponentButtonText,
                sortBy === PROFESSOR_SORT_BY.Students && { color: "white" },
              ]}
            >
              {"Qtd. alunos"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#0091FF"}
            onPress={() => handleChangeSortBy(PROFESSOR_SORT_BY.Lessons)}
            style={[
              { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
              styles.listHeaderComponentButton,
              sortBy === PROFESSOR_SORT_BY.Lessons
                ? styles.listHeaderComponentActiveButton
                : styles.listHeaderComponentInactiveButton,
            ]}
          >
            <Text
              style={[
                styles.listHeaderComponentButtonText,
                sortBy === PROFESSOR_SORT_BY.Lessons && { color: "white" },
              ]}
            >
              {"Qtd. aulas"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<IProfessor>) => {
    return (
      <TouchableHighlight
        underlayColor={"#F8FAFC"}
        onPress={() => handleJoinProfessor(item)}
      >
        <View style={styles.card} key={index}>
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
            {item?.grammar && (
              <Text
                style={styles.cardMiddleSubText}
              >{`Ensinando libras com ${item.grammar}.`}</Text>
            )}
          </View>
          <View style={styles.cardMetrics}>
            <View style={styles.cardMetricsItems}>
              <Text style={styles.cardMetricsItemsText}>
                {item?.Students?.length || 0}
              </Text>
              <Feather name={"users"} size={20} color={"#1B9CFC"} />
            </View>
            <View style={styles.cardMetricsItems}>
              <Text style={styles.cardMetricsItemsText}>
                {item?.Lessons?.length || 0}
              </Text>
              <Ionicons name={"book-outline"} size={20} color={"#1B9CFC"} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.ArrowLeft}>
          {student?.professorId && (
            <TouchableOpacity onPress={handleGoBack}>
              <ArrowLeftIcon
                height={40}
                width={40}
                fillOpacity={0}
                stroke={"#1B9CFC"}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.panelText}>{"Buscar professor"}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.searchOptions}>
            <Text style={styles.searchOptionsText}>
              {"Busque seu professor por seu nome"}
            </Text>
            <TextInputComponent
              height={50}
              width={"100%"}
              placeholder={"Pesquise pelo professor"}
              style={"secondary"}
              customStyle={styles.inputCustomStyle}
              value={search}
              onChangeText={handleChangeSearch}
              onSubmitEditing={() => {}}
            />
          </View>
          <View style={styles.searchOptions}>
            <Text style={styles.searchOptionsText}>
              {"Escolha sua gramática"}
            </Text>
            <PickerComponent
              style={"secondary"}
              height={60}
              optionsList={grammarList}
              onPickerPress={handleTogglePicker}
              selectedOption={grammar || ""}
              isPickerVisible={isPickerVisible}
              onValueChange={handleGrammarValueChange}
              isItemEnabled={true}
            />
          </View>
        </TouchableWithoutFeedback>
        <FlatList
          data={professors}
          renderItem={renderItem}
          style={styles.flatListContainer}
          keyExtractor={({ id }) => id.toString()}
          ListHeaderComponent={listHeaderComponent}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentSearchProfessorScreen;

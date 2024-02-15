import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { IStudent, IUserOutput } from "../../../interfaces";
import { STUDENT_SORT_BY } from "../../../enums";
import api from "../../../utils/api";
import styles from "./styles";
import UserImageComponent from "../../../components/UserImage";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import TextInputComponent from "../../../components/input";
import { useAuth } from "../../../contexts/AuthContext";

type Props = NativeStackScreenProps<any>;

const StudentScoreboardScreen = ({ navigation }: Props) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<STUDENT_SORT_BY>(
    STUDENT_SORT_BY.Experience
  );

  const handleChangeSearch = (text: string) => setSearch(text);

  const handleChangeSortBy = (newSortBy: STUDENT_SORT_BY) => {
    if (sortBy !== newSortBy) setSortBy(newSortBy);
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const { Student } = (await api.get(`/user/${user?.sub}`))
        .data as IUserOutput;
      const { professorId } = (await api.get(`/student/${Student?.id}`))
        .data as IStudent;
      const _students = (
        await api.get(`/student/`, { params: { professorId, sortBy, search } })
      ).data as IStudent[];

      setStudents(_students);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      return Alert.alert("Erro ao buscar estudantes", error?.message);
    }
  };

  useEffect(() => {
    user && fetchStudents();
  }, [user, sortBy, search]);

  const handleOpenProfile = (student: IStudent) => {
    // TODO: implement friend profile
    Alert.alert(`Perfil de ${student?.User.fullName}`);
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
        onPress={() => handleOpenProfile(item)}
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
        <Text style={styles.panelText}>{"Placar"}</Text>
      </View>
      <View style={styles.flexContainer}>
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

export default StudentScoreboardScreen;

import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { Alert, ListRenderItemInfo, Text, View } from "react-native";
import {
  FlatList,
  RefreshControl,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import PhotoUploadImage from "../../../components/PhotoUploadImage";
import { useAuth } from "../../../contexts/AuthContext";
import {
  ILessonLevelOutput,
  ILessonOutput,
  IProfessor,
  IStudent,
  IStudentLesson,
} from "../../../interfaces";
import api from "../../../utils/api";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import styles from "./styles";

type Props = NativeStackScreenProps<any>;

const StudentLessonsScreen = ({ navigation }: Props) => {
  const { user } = useAuth();

  const [refreshing, setRefreshing] = useState(false);
  const [student, setStudent] = useState<IStudent>();
  const [professor, setProfessor] = useState<IProfessor>();
  const [lessons, setLessons] = useState<ILessonOutput[]>([]);

  // TODO: implement in all screens
  const init = async () => {
    try {
      const _user = (await api.get(`/user/${user?.sub}`)).data;
      const _student = (await api.get(`/student/${_user?.Student?.id}`)).data;

      const _professor = (await api.get(`/professor/${_student?.professorId}`))
        .data as IProfessor;

      setStudent(_student);
      setProfessor(_professor);
    } catch (error: any) {
      Alert.alert("Não foi possível obter dados do usuário", error?.message);
      return navigation.goBack();
    }
  };

  useEffect(() => {
    init();
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  useEffect(() => {
    async function fetchLessons() {
      try {
        const lessonsData = (
          await api.get(`/professor/${student?.professorId}/lesson`)
        ).data as ILessonOutput[];

        const filteredLessons = lessonsData.filter(
          (lesson) =>
            lesson?.Levels?.length &&
            lesson?.Levels?.filter(
              (level) => level?.LessonLevelExercises?.length
            )
        );

        setLessons(filteredLessons);
      } catch (error: any) {
        Alert.alert("Não foi possível obter aulas", error?.message);
        return navigation.goBack();
      } finally {
        setRefreshing(false);
      }
    }

    student && fetchLessons();
  }, [student, refreshing]);

  const onRefresh = () => setRefreshing(true);

  const handleLesson = async (
    lesson: ILessonOutput,
    progress?: IStudentLesson
  ) => {
    try {
      if (!lesson.Levels.find((l) => l.level === progress?.currentLevel)) {
        return Alert.alert(
          "Nível não existente",
          `O nível ${progress?.currentLevel} deste exercício ainda não existe`
        );
      }

      if (!student?.Lessons.find((l) => l.id === lesson.id) || !progress) {
        await api.post(`/student/${student?.id}/lesson/${lesson.id}`, {
          currentLevel: progress?.currentLevel || 1,
          isCompleted: false,
        });

        return navigation.navigate("StudentLessons");
      }

      const levelId = lesson.Levels.find(
        (level) => level.level === progress.currentLevel
      )?.id;

      if (!levelId) Alert.alert("Nível não encontrado");

      const level = (await api.get(`/lesson/${lesson.id}/level/${levelId}`))
        .data as ILessonLevelOutput;

      return navigation.navigate("StudentExercise", {
        student: JSON.stringify(student),
        level: JSON.stringify(level),
        studentLessonId: progress.id,
      });
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        `Não foi possível iniciar aula "${lesson.title}"`,
        error?.message
      );
    }
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ILessonOutput>) => {
    const progress = student?.Lessons[index] || undefined;

    return (
      <View style={styles.renderItemLessonSection}>
        <TouchableHighlight style={styles.renderItemLessonImage}>
          <PhotoUploadImage
            key={index}
            source={
              item?.icon ? { uri: getMediaUrlFromS3Key(item.icon) } : undefined
            }
            onPress={() => handleLesson(item, progress)}
          />
        </TouchableHighlight>
        <View style={styles.renderItemLessonLevelBubble}>
          <Text style={styles.renderItemLessonLevelBubbleText}>
            {progress?.currentLevel ?? "Iniciar"}
          </Text>
        </View>
        <Text style={styles.renderItemLessonText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={styles.headerTitle}
        >{`Aulas - Prof. ${professor?.User.fullName}`}</Text>
        <Text
          style={styles.headerSubTitle}
        >{`Gramática ${professor?.grammar}`}</Text>
      </View>
      {lessons?.length ? (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.flatListContentContainerStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.emptyLevelMessage}>
          <Text style={styles.emptyLevelMessageText}>
            {"nenhuma aula foi criada  :("}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StudentLessonsScreen;

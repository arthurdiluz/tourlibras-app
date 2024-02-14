import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { it } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
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

  const [itemLoading, setItemLoading] = useState<number>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [student, setStudent] = useState<IStudent>();
  const [professor, setProfessor] = useState<IProfessor>();
  const [lessons, setLessons] = useState<ILessonOutput[]>([]);

  const init = async () => {
    try {
      if (!user) return;

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

  const fetchLessons = async () => {
    try {
      if (!student) return;

      const lessonsData = (
        await api.get(`/professor/${student?.professorId}/lesson`)
      ).data as ILessonOutput[];

      const filteredLessons = lessonsData.filter(
        (lesson) =>
          lesson?.Levels?.length &&
          lesson?.Levels?.filter((level) => level?.LessonLevelExercises?.length)
      );

      setLessons(filteredLessons);
    } catch (error: any) {
      Alert.alert("Não foi possível obter aulas", error?.message);
      return navigation.goBack();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    user && init();
  }, [user, refreshing]);

  useEffect(() => {
    student && fetchLessons();
  }, [student, refreshing]);

  useFocusEffect(
    useCallback(() => {
      user && init();
      student && fetchLessons();
    }, [])
  );

  const onRefresh = () => setRefreshing(true);

  const handleLesson = async (
    lesson: ILessonOutput,
    studentLesson?: IStudentLesson
  ) => {
    if (itemLoading) return;

    try {
      setItemLoading(lesson.id);

      if (!student) throw new Error("Estudante não encontrado");

      if (
        !student.Lessons.find((l) => l.lessonId === lesson.id) ||
        !studentLesson
      ) {
        await api.post(`/student/${student.id}/lesson/${lesson.id}`, {
          currentLevel: studentLesson?.currentLevel || 1,
          isCompleted: false,
        });
        return navigation.navigate("Lessons");
      }

      if (
        !lesson.Levels ||
        !lesson.Levels.find((l) => l.level === studentLesson.currentLevel)
      ) {
        return Alert.alert(
          "Nível não existente",
          studentLesson?.currentLevel
            ? `O nível ${studentLesson?.currentLevel} deste exercício ainda não foi criado`
            : `Esta aula ainda não possui níveis`
        );
      }

      const levelId = lesson.Levels.find(
        (level) => level.level === studentLesson?.currentLevel
      )?.id;

      if (!levelId) return Alert.alert("Nível não encontrado");

      const level = (await api.get(`/lesson/${lesson.id}/level/${levelId}`))
        .data as ILessonLevelOutput;

      return navigation.navigate("StudentExercise", {
        student: JSON.stringify(student),
        level: JSON.stringify(level),
        studentLessonId: studentLesson.id,
      });
    } catch (error: any) {
      return Alert.alert(
        `Não foi possível iniciar aula "${lesson.title}"`,
        error?.message
      );
    } finally {
      setItemLoading(undefined);
    }
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ILessonOutput>) => {
    const studentLesson = student?.Lessons[index] || undefined;

    return (
      <View style={styles.renderItemLessonSection}>
        <TouchableHighlight
          style={styles.renderItemLessonImage}
          disabled={!!itemLoading}
        >
          <PhotoUploadImage
            key={index}
            source={
              item?.icon ? { uri: getMediaUrlFromS3Key(item.icon) } : undefined
            }
            onPress={() => handleLesson(item, studentLesson)}
          />
        </TouchableHighlight>
        <View style={styles.renderItemLessonLevelBubble}>
          <Text style={styles.renderItemLessonLevelBubbleText}>
            {itemLoading === item.id ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              student?.Lessons.find((l) => l.lessonId === item.id)
                ?.currentLevel ?? "Iniciar"
            )}
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
        >{`Aulas - Prof. ${professor?.User?.fullName}`}</Text>
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

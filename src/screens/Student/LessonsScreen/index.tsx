import React, { useEffect, useState } from "react";
import { Alert, ListRenderItemInfo, Text, View } from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import PhotoUploadImage from "../../../components/PhotoUploadImage";
import { useAuth } from "../../../contexts/AuthContext";
import { ILessonOutput, IProfessor, IStudent } from "../../../interfaces";
import api from "../../../utils/api";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import styles from "./styles";

const StudentLessonsScreen = () => {
  const { user } = useAuth();

  const [student, setStudent] = useState<IStudent>();
  const [professor, setProfessor] = useState<IProfessor>();
  const [lessons, setLessons] = useState<ILessonOutput[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const _user = (await api.get(`/user/${user?.sub}`)).data;
        const _student = (await api.get(`/student/${_user?.Student?.id}`)).data;

        const _professor = (
          await api.get(`/professor/${_student?.professorId}`)
        ).data as IProfessor;

        setStudent(_student);
        setProfessor(_professor);
      } catch (error) {}
    }

    init();
  }, []);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const _lessons = (await (
          await api.get(`/professor/${student?.professorId}/lesson`)
        ).data) as ILessonOutput[];
        setLessons(_lessons);
      } catch (error: any) {
        return Alert.alert("Could not fetch lessons", error?.message);
      }
    }

    fetchLessons();
  }, [student]);

  const handleLesson = (lesson: ILessonOutput) => {
    // TODO: navigate to Exercise
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ILessonOutput>) => {
    return (
      <View style={styles.renderItemLessonSection}>
        <TouchableHighlight style={styles.renderItemLessonImage}>
          <PhotoUploadImage
            key={index}
            source={
              item?.icon ? { uri: getMediaUrlFromS3Key(item.icon) } : undefined
            }
            onPress={() => handleLesson(item)}
          />
        </TouchableHighlight>
        <View style={styles.renderItemLessonLevelBubble}>
          <Text style={styles.renderItemLessonLevelBubbleText}>
            {item.Levels[0].level}
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
      {lessons ? (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.flatListContentContainerStyle}
          extraData={lessons}
        />
      ) : (
        <View style={styles.emptyLevelMessage}>
          <Text style={styles.emptyLevelMessageText}>
            {"nenhuma aula foi criada :("}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StudentLessonsScreen;

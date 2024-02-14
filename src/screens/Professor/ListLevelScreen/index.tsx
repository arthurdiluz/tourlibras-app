import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, ListRenderItemInfo, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ILessonOutput } from "../../../interfaces";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import PhotoUploadImage from "../../../components/PhotoUploadImage";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<any>;

const ProfessorListLevelScreen = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Array<ILessonOutput>>([]);

  const fetchLesson = async () => {
    try {
      if (!user) return;

      const lessonsData: Array<ILessonOutput> = (
        await api.get(`/professor/${user.sub}/lesson`)
      ).data;

      lessonsData.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setLessons(lessonsData);
    } catch (error: any) {
      return Alert.alert("Não foi possível obter as aulas", error?.message);
    }
  };

  useEffect(() => {
    user && fetchLesson();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      user && fetchLesson();
    }, [])
  );

  const handleGoBack = () => {
    return navigation.goBack();
  };

  const handleLesson = (lesson: ILessonOutput) => {
    return Alert.alert(
      `Aula "${lesson.title}" selecionada`,
      "O que deseja fazer com a aula?",
      [
        {
          text: "Remover",
          style: "destructive",
          onPress: () =>
            Alert.alert(
              "Apagar aula",
              "Deseja apagar a aula? Esta ação é irreversível.",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Apagar aula",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      await api.delete(
                        `/professor/${lesson.professorId}/lesson/${lesson.id}`
                      );
                      // Remove the deleted lesson from the state
                      setLessons((prevLessons) =>
                        prevLessons.filter((l) => l.id !== lesson.id)
                      );
                    } catch (error: any) {
                      Alert.alert("Erro ao apagar aula", error?.message);
                    }
                  },
                },
              ]
            ),
        },
        {
          text: "Editar",
          style: "default",
          onPress: () => {
            return navigation.navigate("ProfessorUpsertLessonScreen", {
              lessonId: lesson.id,
            });
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ILessonOutput>) => {
    return (
      <View style={styles.renderItemLessonSection}>
        <View style={styles.renderItemLessonImage}>
          <PhotoUploadImage
            key={index}
            source={
              item?.icon ? { uri: getMediaUrlFromS3Key(item.icon) } : undefined
            }
            onPress={() => handleLesson(item)}
          />
        </View>
        <Text style={styles.renderItemLessonText}>{item.title}</Text>
      </View>
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
        <Text style={styles.panelText}>{"Editar aula"}</Text>
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

export default ProfessorListLevelScreen;

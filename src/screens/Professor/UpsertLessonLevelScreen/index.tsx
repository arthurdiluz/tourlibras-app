import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Keyboard, ListRenderItemInfo, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import TextInputComponent from "../../../components/input";
import api from "../../../utils/api";
import { ILessonLevelOutput, ILevelExerciseOutput } from "../../../interfaces";
import ButtonComponent from "../../../components/Button";
import CardComponent from "../../../components/CardComponent";
import { useFocusEffect } from "@react-navigation/native";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const ProfessorUpsertLessonLevelScreen = ({ navigation, route }: Props) => {
  const lessonId: number | undefined = route.params?.lessonId;
  const levelId: number | undefined = route.params?.levelId;
  const levelValue: number | undefined = route.params?.levelValue;

  const [levelData, setLevelData] = useState<ILessonLevelOutput | null>(null);
  const [level, setLevel] = useState<number | null>(levelValue || null);
  const [earnedXp, setEarnedXp] = useState<number>(0);
  const [earnedMoney, setEarnedMoney] = useState<number>(0);

  const init = async () => {
    if (!lessonId || !levelId) return;
    try {
      const _level: ILessonLevelOutput = (
        await api.get(`/lesson/${lessonId}/level/${levelId}`)
      ).data;

      setLevelData(_level);
      setLevel(_level.level ?? 0);
      setEarnedXp(_level.earnedXp ?? 0);
      setEarnedMoney(_level.earnedMoney ?? 0);
    } catch (error) {
      return Alert.alert(
        "Erro ao obter dados do nível",
        getErrorMessage(error)
      );
    }
  };

  useEffect(() => {
    init();
  }, [lessonId, levelId]);

  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  const handleGoBack = () => {
    return navigation.goBack();
  };

  const handleSaveLevel = async () => {
    Keyboard.dismiss();

    async function createLevel() {
      try {
        // TODO: add validations
        const _level: ILessonLevelOutput = (
          await api.post(`/lesson/${lessonId}/level`, {
            level,
            earnedXp,
            earnedMoney,
          })
        ).data;
        setLevelData(_level);

        return navigation.navigate("ProfessorUpsertLessonLevelScreen", {
          lessonId,
          levelId: _level.id,
          levelValue: _level.level,
        });
      } catch (error) {
        return Alert.alert(
          "Não foi possível criar nível da aula",
          getErrorMessage(error)
        );
      }
    }

    async function updateLevel() {
      try {
        // TODO: add validations
        const updatedLevel = (
          await api.patch(`/lesson/${lessonId}/level/${levelId}`, {
            earnedXp,
            earnedMoney,
          })
        ).data as ILessonLevelOutput;

        setLevelData(updatedLevel);

        return navigation.navigate("ProfessorUpsertLessonLevelScreen", {
          lessonId,
          levelId,
          levelValue,
        });
      } catch (error) {
        return Alert.alert(
          "Não foi possível atualizar nível da aula",
          getErrorMessage(error)
        );
      }
    }

    return lessonId
      ? levelId
        ? await updateLevel()
        : await createLevel()
      : navigation.goBack();
  };

  const handleCreateExercise = () => {
    return navigation.navigate("ProfessorUpsertLessonLevelExerciseScreen", {
      lessonId,
      levelId,
    });
  };

  const handleExperienceChange = (v: string) => {
    if (v === "" || /^[0-9]+$/.test(v)) {
      setEarnedXp(v === "" ? 0 : Number.parseInt(v));
    }
  };

  const handleMoneyChange = (v: string) => {
    if (v === "" || /^[0-9]+$/.test(v)) {
      setEarnedMoney(v === "" ? 0 : Number.parseInt(v));
    }
  };

  const handleEditExercise = async (exercise: ILevelExerciseOutput) => {
    return navigation.navigate("ProfessorUpsertLessonLevelExerciseScreen", {
      lessonId,
      levelId,
      exerciseId: exercise.id,
    });
  };

  const handleDeleteExercise = (exercise: ILevelExerciseOutput) => {
    return Alert.alert(
      `Deseja remover o exercício?`,
      "Esta ação é irreversível",
      [
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/level/${levelId}/exercise/${exercise.id}`);
              return setLevelData(
                (prevLevelData: ILessonLevelOutput | null) => {
                  if (!prevLevelData) return null;
                  return {
                    ...prevLevelData,
                    LessonLevelExercises:
                      prevLevelData.LessonLevelExercises?.filter(
                        (e) => e.id !== exercise.id
                      ),
                  };
                }
              );
            } catch (error) {
              return Alert.alert("Erro ao apagar aula", getErrorMessage(error));
            }
          },
        },

        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  const handleGoToExercise = (exercise: ILevelExerciseOutput) => {
    return navigation.navigate("ProfessorUpsertLessonLevelExerciseScreen", {
      lessonId,
      levelId,
      exerciseId: exercise.id,
    });
  };

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<ILevelExerciseOutput>) => {
    return (
      <CardComponent
        height={100}
        width={"100%"}
        style={"primary"}
        customStyle={styles.card}
      >
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => handleGoToExercise(item)}
        >
          <Text style={styles.cardHeaderSubTitle}>{`E${index + 1}`}</Text>
          <Text style={styles.cardHeaderTitle}>{item.statement}</Text>
        </TouchableOpacity>
        <View style={styles.cardActionButtons}>
          <Text
            onPress={() => handleEditExercise(item)}
            style={styles.cardActionButtonsEdit}
          >
            {"editar"}
          </Text>
          <Text
            onPress={() => handleDeleteExercise(item)}
            style={styles.cardActionButtonsDelete}
          >
            {"excluir"}
          </Text>
        </View>
      </CardComponent>
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
        <Text style={styles.panelText}>
          {level ? `Nível ${level}` : "novo nível"}
        </Text>
        <View style={styles.saveTextArea}>
          <TouchableOpacity onPress={handleSaveLevel}>
            <Text style={[styles.saveTextButton]}>{"salvar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, width: "90%" }}>
        <View style={styles.inputsSection}>
          <View style={styles.inputSection}>
            <Text style={styles.inputSectionText}>{"Experiência"}</Text>
            <TextInputComponent
              height={55}
              width={"100%"}
              style={"secondary"}
              keyboardType={"number-pad"}
              value={earnedXp.toString()}
              onChangeText={handleExperienceChange}
            />
          </View>
          <View style={styles.inputSection}>
            <Text style={styles.inputSectionText}>{"Dinheiro"}</Text>
            <TextInputComponent
              height={55}
              width={"100%"}
              style={"secondary"}
              keyboardType={"number-pad"}
              value={earnedMoney?.toString()}
              onChangeText={handleMoneyChange}
            />
          </View>
        </View>
        {!!levelData?.LessonLevelExercises?.length ? (
          <FlatList
            data={levelData?.LessonLevelExercises}
            renderItem={renderItem}
            keyExtractor={({ id }) =>
              id?.toString() || new Date().getTime().toString()
            }
            style={styles.flatListContainer}
          />
        ) : (
          levelId && (
            <View style={styles.emptyLevelMessage}>
              <Text style={styles.emptyLevelMessageText}>
                {"Nenhum exercício criado :("}
              </Text>
            </View>
          )
        )}
      </View>
      {levelId && (
        <ButtonComponent
          title="criar novo exercício"
          style="secondary"
          height={55}
          width={"90%"}
          onPress={handleCreateExercise}
          customStyle={{ marginTop: 15 }}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfessorUpsertLessonLevelScreen;

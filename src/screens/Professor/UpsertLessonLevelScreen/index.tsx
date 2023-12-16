import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ListRenderItemInfo, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import styles from "./styles";
import TextInputComponent from "../../../components/input";
import api from "../../../utils/api";
import { ILessonLevelOutput } from "../../../interfaces";
import ButtonComponent from "../../../components/Button";

type Props = NativeStackScreenProps<any>;

const ProfessorUpsertLessonLevelScreen = ({ navigation, route }: Props) => {
  const lessonId: number | undefined = route.params?.lessonId;
  const levelId: number | undefined = route.params?.levelId;
  const levelValue: number | undefined = route.params?.levelValue;

  const [levelData, setLevelData] = useState<ILessonLevelOutput | null>(null);
  const [level, setLevel] = useState<number | null>(levelValue || null);
  const [earnedXp, setEarnedXp] = useState<number>(0);
  const [earnedMoney, setEarnedMoney] = useState<number>(0);

  useEffect(() => {
    async function fetchLevelData() {
      try {
        const _level: ILessonLevelOutput = (
          await api.get(`/lesson/${lessonId}/level/${levelId}`)
        ).data;

        setLevelData(_level);
        setLevel(_level.level ?? 0);
        setEarnedXp(_level.earnedXp ?? 0);
        setEarnedMoney(_level.earnedMoney ?? 0);
      } catch (error: any) {
        return Alert.alert(
          "Não foi possível obter dados do professor",
          error?.message
        );
      }
    }

    lessonId && levelId && fetchLevelData();
  }, []);

  const handleGoBack = () => {
    return navigation.goBack();
  };

  const handleSaveLevel = async () => {
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
          levelId: _level.id,
        });
      } catch (error: any) {
        Alert.alert("Não foi possível criar nível da aula", error?.message);
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

        // TODO: refresh screen
        return navigation.navigate("ProfessorUpsertLessonLevelScreen", {
          levelId: updatedLevel.id,
        });
      } catch (error: any) {
        Alert.alert("Não foi possível atualizar nível da aula", error?.message);
      }
    }

    return lessonId
      ? levelId
        ? await updateLevel()
        : await createLevel()
      : navigation.goBack();
  };

  const handleCreateExercise = () => {
    // TODO: implement exercise creation
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

  const renderItem = ({ item, index }: ListRenderItemInfo<any>) => {
    console.log({ item });
    return <Text>{"item"}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        {/* TODO: fix "go back" button */}
        <View style={styles.ArrowLeft}>
          <TouchableOpacity onPress={handleGoBack}>
            <ArrowLeftIcon
              height={40}
              width={40}
              fillOpacity={0}
              stroke={"#1B9CFC"}
            />
          </TouchableOpacity>
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
        {levelData?.LessonLevelExercises?.length ? (
          <FlatList
            data={levelData?.LessonLevelExercises}
            renderItem={renderItem}
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

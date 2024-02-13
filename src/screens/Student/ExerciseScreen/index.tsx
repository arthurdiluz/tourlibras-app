import React, { useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Octicons } from "@expo/vector-icons";
import {
  ILessonLevelDone,
  ILessonLevelOutput,
  IStudent,
} from "../../../interfaces";
import { Exercise } from "./Exercise";
import styles from "./styles";
import ButtonComponent from "../../../components/Button";
import api from "../../../utils/api";

export interface Step {
  index: number;
  isCorrect?: boolean | null;
}

type Props = NativeStackScreenProps<any>;
type IResult = {
  trueCount: number;
  totalCount: number;
  threshold: number;
};

const StudentExerciseScreen = ({ navigation, route }: Props) => {
  const student: IStudent | undefined = JSON.parse(route.params?.student);
  const level: ILessonLevelOutput | undefined = JSON.parse(route.params?.level);
  const studentLessonId: number | undefined = Number.parseInt(
    route.params?.studentLessonId
  );
  const exercises = level?.LessonLevelExercises;

  if (!exercises) return navigation.goBack();

  const [steps, setSteps] = useState<Step[]>(
    exercises.flatMap((_, index) => ({
      isCorrect: null,
      index,
    }))
  );

  const [step, setStep] = useState<Step>({ index: 0, isCorrect: null });
  const [result, setResult] = useState<IResult>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<ILessonLevelDone>>({ Answers: [] });

  const updateFormData = (update: boolean) => {
    setForm((prev) => ({
      ...prev,
      Answers: [...(prev.Answers || []), update],
    }));
  };

  const handleForwardStep = (answer: boolean) => {
    if (step.index < steps.length) {
      const updatedSteps = steps.map((s, index) => {
        if (index === step.index) {
          return { ...s, isCorrect: answer };
        }
        return s;
      });
      setSteps(updatedSteps);
      setStep((previous) => updatedSteps[previous.index + 1]);
      updateFormData(answer);

      return setResult({
        trueCount: updatedSteps.filter(({ isCorrect }) => !!isCorrect)?.length,
        totalCount: updatedSteps?.length,
        threshold: updatedSteps?.length * 0.7,
      });
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      // TODO: implement feature
      // const response = await api.post(
      //   `{{domain}}/student-lesson/${studentLessonId}/level-exercise/${1}/done`
      // );
      // console.log(response);
      // return navigation.push("StudentLessonsStack");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Não foi possível avaliar exercício", error?.message);
      return setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    return Alert.alert(
      "Tem certez que deseja sair da aula?",
      "Todo seu progresso será perdido",
      [
        {
          text: "Cancelar",
          style: "cancel",
          isPreferred: true,
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        {step?.index < steps.length ? (
          <Ionicons
            name="arrow-back"
            size={32}
            color={"#1B9CFC"}
            onPress={handleGoBack}
          />
        ) : (
          <View style={{ width: 32 }}></View>
        )}
        <View style={{ flexDirection: "row", gap: 5 }}>
          {steps.map((s) => (
            <Octicons
              name="dot-fill"
              size={24}
              color={
                s.isCorrect?.valueOf
                  ? s.isCorrect
                    ? "#00FF00"
                    : "#FF0000"
                  : "#D9D9D9"
              }
            />
          ))}
        </View>
        <Text style={[styles.stepCounter]}>{`${
          step?.index + 1 || steps.length
        }/${steps?.length}`}</Text>
      </View>
      <View style={styles.exerciseScreen}>
        {step?.index < steps?.length ? (
          <Exercise
            key={step?.index}
            exercise={exercises[step?.index]}
            handleForwardStep={handleForwardStep}
          />
        ) : (
          <View style={styles.resultScreen}>
            {result && result?.trueCount >= result?.threshold ? (
              <View style={styles.resultScreenSection}>
                <Text
                  style={[styles.resultScreenSectionText, { color: "#6ab04c" }]}
                >
                  {"aprovado!"}
                </Text>
                <Ionicons name="happy-outline" size={64} />
              </View>
            ) : (
              <View style={styles.resultScreenSection}>
                <Text
                  style={[styles.resultScreenSectionText, { color: "#eb4d4b" }]}
                >
                  {"reprovado!"}
                </Text>
                <Ionicons name="sad-outline" size={64} />
              </View>
            )}
            <Text style={styles.resultScreenSectionReasonText1}>
              {`Você acertou ${result?.trueCount} de ${result?.totalCount} questões`}
            </Text>
            <Text style={styles.resultScreenSectionReasonText2}>
              {`Aproveitamento de ${(
                ((result?.trueCount || 0) / (result?.totalCount || 0)) *
                100
              ).toFixed(
                (result?.trueCount || 0) % (result?.totalCount || 0) ? 1 : 0
              )}%`}
            </Text>
            <ButtonComponent
              title="Voltar para aulas"
              height={"10%"}
              width={"90%"}
              style="secondary"
              disabled={isLoading}
              customStyle={{
                position: "absolute",
                bottom: "2%",
                backgroundColor:
                  result && result?.trueCount >= result?.threshold
                    ? "green"
                    : "red",
              }}
              onPress={submit}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StudentExerciseScreen;

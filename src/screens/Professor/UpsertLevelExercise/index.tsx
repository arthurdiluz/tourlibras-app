import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AVPlaybackNativeSource, AVPlaybackSource } from "expo-av";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CardComponent from "../../../components/CardComponent";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import TextInputComponent from "../../../components/input";
import VideoUploadImage from "../../../components/VideoUploadImage";
import { useAuth } from "../../../contexts/AuthContext";
import {
  IAlternativeInput,
  ILevelExerciseInput,
  ILevelExerciseOutput,
} from "../../../interfaces";
import { uploadVideoFromGallery } from "../../../services/mediaUpload";
import api from "../../../utils/api";
import { getMediaUrlFromS3Key, uploadMedia } from "../../../utils/file";
import styles from "./styles";

type Props = NativeStackScreenProps<any>;

const ProfessorUpsertLessonLevelExerciseScreen = ({
  navigation,
  route,
}: Props) => {
  const { token } = useAuth();
  const lessonId: number | undefined = route.params?.lessonId;
  const levelId: number | undefined = route.params?.levelId;
  const exerciseId: number | undefined = route.params?.exerciseId;

  const getDefaultAlternatives = (count: number): IAlternativeInput[] => {
    return Array.from({ length: count }, () => ({
      text: "",
      isCorrect: false,
    }));
  };

  const [media, setMedia] = useState<AVPlaybackNativeSource>();
  const [statement, setStatement] = useState<string>();
  const [Alternatives, setAlternatives] = useState<IAlternativeInput[]>(
    getDefaultAlternatives(4)
  );

  useEffect(() => {
    async function fetchExerciseData() {
      try {
        const _exercise: ILevelExerciseOutput = (
          await api.get(`/level/${levelId}/exercise/${exerciseId}`)
        ).data;

        setMedia({ uri: getMediaUrlFromS3Key(_exercise.media) });
        setStatement(_exercise.statement);
        setAlternatives(_exercise.Alternatives);
      } catch (error: any) {
        return Alert.alert(
          "Não foi possível obter dados do exercício",
          error?.message
        );
      }
    }

    levelId && exerciseId && fetchExerciseData();
  }, []);

  const handleAddVideo = async () => {
    try {
      const key = await uploadVideoFromGallery({ uploadToAws: false });
      if (!key) throw new Error("Não foi possível adicionar vídeo");
      setMedia({ uri: key });

      return navigation.navigate("ProfessorUpsertLessonLevelExerciseScreen", {
        lessonId,
        levelId,
        exerciseId,
      });
    } catch (error: any) {
      Alert.alert("Erro ao adicionar vídeo", error?.message);
      throw error;
    }
  };

  const handleSaveExercise = async () => {
    async function createExercise() {
      try {
        if (!media) throw Error("Vídeo não selecionado");
        if (!statement) throw Error("Enunciado não criado");

        if (Alternatives.length !== 4) {
          throw Error("Devem existir apenas 4 alternativas");
        }

        if (Alternatives.filter((a) => !a.text.length).length) {
          throw Error("Você deve preencher todos os enunciados");
        }

        if (Alternatives.filter((a) => a.isCorrect).length !== 1) {
          throw Error("Deve existir apenas uma alternativa correta");
        }

        const body: ILevelExerciseInput = {
          media: media?.uri,
          statement,
          Alternatives,
        };

        const _exercise: ILevelExerciseOutput = (
          await api.post(`/level/${levelId}/exercise`, body)
        ).data;

        const key = await uploadMedia({
          endpoint: `/level/${levelId}/exercise/${_exercise.id}/video`,
          uri: body.media,
          token,
        });

        if (!key) {
          await api.delete(`/level/${levelId}/exercise/${_exercise.id}`);
          return navigation.goBack();
        }

        setMedia({ uri: getMediaUrlFromS3Key(key) });
        setStatement(_exercise.statement);
        setAlternatives(_exercise.Alternatives);

        Alert.alert("Exercício criado com sucesso");
        return navigation.goBack();
      } catch (error: any) {
        Alert.alert("Não foi possível criar exercício da aula", error?.message);
      }
    }

    // TODO: fix update on backend
    async function updateExercise() {
      try {
        // if (!media) throw Error("Vídeo não selecionado");
        // if (!statement) throw Error("Enunciado não criado");

        // if (Alternatives.length !== 4) {
        //   throw Error("Devem existir apenas 4 alternativas");
        // }

        // if (Alternatives.filter((a) => !a.text.length).length) {
        //   throw Error("Você deve preencher todos os enunciados");
        // }

        // if (Alternatives.filter((a) => a.isCorrect).length !== 1) {
        //   throw Error("Deve existir apenas uma alternativa correta");
        // }

        // const body: Partial<ILevelExerciseInput> = {
        //   statement,
        //   Alternatives: Alternatives.map(({ text, isCorrect }) => ({
        //     text,
        //     isCorrect,
        //   })),
        // };

        // const updatedLevel = (
        //   await api.patch(`/level/${levelId}/exercise/${exerciseId}`, body)
        // ).data as ILevelExerciseOutput;

        // if (media.uri.startsWith("file")) {
        //   const key = await uploadMedia({
        //     endpoint: `/level/${levelId}/exercise/${updatedLevel.id}/video`,
        //     uri: media.uri,
        //     token,
        //   });
        //   if (!key) return navigation.goBack();
        //   setMedia({ uri: getMediaUrlFromS3Key(updatedLevel.media) });
        // }

        // setStatement(updatedLevel.statement);
        // setAlternatives(updatedLevel.Alternatives);

        Alert.alert("Exercício atualizado com sucesso");
        return navigation.goBack();
      } catch (error: any) {
        Alert.alert(
          "Não foi possível atualizar exercício da aula",
          error?.message
        );
      }
    }

    levelId
      ? exerciseId
        ? await updateExercise()
        : await createExercise()
      : navigation.goBack();
  };

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<IAlternativeInput>) => {
    return (
      <CardComponent
        key={index}
        height={225}
        width={"100%"}
        style={"primary"}
        customStyle={styles.card}
      >
        <Text style={styles.cardTitle}>{`Alternativa ${index + 1}`}</Text>
        <TextInputComponent
          style={"secondary"}
          customStyle={styles.inputCustomStyle}
          height={50}
          width={"100%"}
          placeholder={"Digite o texto da alternativa"}
          value={item.text}
          onChangeText={(text) => handleChangeAlternativeText(index, text)}
        />
        <View style={styles.checkboxSection}>
          <Checkbox
            style={styles.checkbox}
            value={item.isCorrect}
            onValueChange={() => handleToggleIsCorrect(index)}
          />
          <Text style={styles.checkboxText}>{"É a alternativa correta?"}</Text>
        </View>
        <Text
          style={styles.cleanButton}
          onPress={() => handleCleanAlternative(index)}
        >
          {"LIMPAR"}
        </Text>
      </CardComponent>
    );
  };

  const handleGoBack = () => navigation.goBack();
  const handleChangeStatement = (text: string) => setStatement(text);

  const handleCleanAlternative = (index: number) => {
    setAlternatives((prevAlternatives) => {
      const updatedAlternatives = [...prevAlternatives];

      updatedAlternatives[index].text = "";
      updatedAlternatives[index].isCorrect = false;

      return updatedAlternatives;
    });
  };

  const handleToggleIsCorrect = (index: number) => {
    setAlternatives((prevAlternatives) => {
      const updatedAlternatives = [...prevAlternatives];
      updatedAlternatives[index].isCorrect =
        !updatedAlternatives[index].isCorrect;

      return updatedAlternatives;
    });
  };

  const handleChangeAlternativeText = (index: number, text: string) => {
    setAlternatives((prevAlternatives) => {
      const updatedAlternatives = [...prevAlternatives];
      updatedAlternatives[index].text = text;
      return updatedAlternatives;
    });
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
        <View style={styles.saveTextArea}>
          <TouchableOpacity onPress={handleSaveExercise}>
            <Text style={[styles.saveTextButton]}>{"salvar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flexContainer}
      >
        <View style={styles.videoArea}>
          <VideoUploadImage
            onPress={handleAddVideo}
            source={!!media ? { uri: media.uri } : undefined}
          />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TextInputComponent
            height={50}
            width={"100%"}
            placeholder={"Digite o enunciado do exercício"}
            style={"secondary"}
            customStyle={styles.inputCustomStyle}
            value={statement}
            onChangeText={handleChangeStatement}
            onSubmitEditing={() => {}}
          />
        </TouchableWithoutFeedback>
        <FlatList
          data={Alternatives}
          renderItem={renderItem}
          style={styles.flatListContainer}
          // keyExtractor={({ text }) => text}
          // extraData={statement}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfessorUpsertLessonLevelExerciseScreen;

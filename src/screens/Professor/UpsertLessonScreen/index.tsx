import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Keyboard,
  ListRenderItemInfo,
  Platform,
  Text,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import api from "../../../utils/api";
import {
  ILessonLevelOutput,
  ILessonOutput,
  IMedalOutput,
  IProfessor,
} from "../../../interfaces";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../../../components/Button";
import PhotoUploadImage from "../../../components/PhotoUploadImage";
import TextInputComponent from "../../../components/input";
import PickerComponent from "../../../components/PickerComponent";
import CardComponent from "../../../components/CardComponent";
import {
  uploadImageFromCamera,
  uploadImageFromGallery,
} from "../../../services/mediaUpload";
import { getMediaUrlFromS3Key, uploadMedia } from "../../../utils/file";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<any>;

const ProfessorUpsertLessonScreen = ({ navigation, route }: Props) => {
  const os = Platform.OS;
  const { user, token } = useAuth();
  const lessonId: number | undefined = route.params?.lessonId;

  const [isPickerVisible, setPickerVisible] = useState(os === "android");
  const [professor, setProfessor] = useState<IProfessor | null>(null);
  const [medals, setMedals] = useState<Array<IMedalOutput>>([]);
  const [lesson, setLesson] = useState<ILessonOutput | null>(null);

  const [icon, setIcon] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedMedal, setSelectedMedal] = useState<IMedalOutput | null>(null);
  const [levels, setLevels] = useState<Array<ILessonLevelOutput>>([]);

  const fetchProfessorData = async () => {
    if (!user) throw new Error("Usuário não encontrado");

    try {
      const { Professor } = (await api.get(`/user/${user?.sub}`))?.data;

      const professorData: IProfessor = (
        await api.get(`/professor/${Professor?.id}`)
      ).data;

      setProfessor(professorData);
      setMedals(professorData.Medals);
    } catch (error: any) {
      return Alert.alert(
        "Não foi possível obter dados do professor",
        error?.message
      );
    }
  };

  const fetchMedalData = async () => {
    if (!professor) return;

    try {
      const _medals: Array<IMedalOutput> = (
        await api.get(`/professor/${professor.id}/medal`)
      ).data;

      setMedals(_medals);
    } catch (error: any) {
      return Alert.alert("Não foi possível obter medalhas", error?.message);
    }
  };

  const fetchLessonData = async () => {
    if (!professor) return;
    if (!lessonId) return;

    try {
      const _lesson: ILessonOutput = (
        await api.get(`/professor/${professor?.id}/lesson/${lessonId}`)
      ).data;

      setLesson(_lesson);
      setIcon(getMediaUrlFromS3Key(_lesson?.icon));
      setTitle(_lesson.title);
      setSelectedMedal(_lesson.Medal);
      setLevels(_lesson.Levels);
    } catch (error: any) {
      return Alert.alert("Não foi possível obter medalhas", error?.message);
    }
  };

  useEffect(() => {
    user && fetchProfessorData();
  }, [user]);

  useEffect(() => {
    professor && fetchMedalData();
    professor && lessonId && fetchLessonData();
  }, [lessonId, professor]);

  useFocusEffect(
    useCallback(() => {
      user && fetchProfessorData();
      professor && fetchMedalData();
      professor && lessonId && fetchLessonData();
    }, [])
  );

  const handleGoBack = () => navigation.goBack();

  const handleTogglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleChangeSelectedMedal = (value: IMedalOutput | string) => {
    if (typeof value === "string") {
      const foundMedal = medals?.find((medal) => medal.name === value);
      return foundMedal && setSelectedMedal(foundMedal);
    }

    setSelectedMedal(value);
  };

  const handleUpdateTitle = (text: string) => setTitle(text);

  const handleMedalValueChange = (medal: string) => {
    handleChangeSelectedMedal(medal);
    os === "ios" && handleTogglePicker();
  };

  const handleSaveLesson = async () => {
    Keyboard.dismiss();

    async function createLesson() {
      try {
        // TODO: add validations
        const _lesson = (
          await api.post(`/professor/${professor?.id}/lesson`, {
            medalId: selectedMedal?.id || undefined,
            title,
          })
        ).data as ILessonOutput;

        const key = await uploadMedia({
          endpoint: `/professor/${professor?.id}/lesson/${_lesson.id}/icon`,
          uri: icon,
          token,
        });

        if (!key) {
          await api.delete(`/professor/${professor?.id}/lesson/${_lesson.id}`);
          return navigation.goBack();
        }

        setIcon(getMediaUrlFromS3Key(key));
        setLesson(_lesson);

        return navigation.navigate("ProfessorUpsertLessonScreen", {
          lessonId: _lesson.id,
        });
      } catch (error: any) {
        Alert.alert("Não foi possível criar aula", error?.message);
      }
    }

    async function updateLesson() {
      try {
        // TODO: add validations

        const updatedLesson = (
          await api.patch(`/professor/${professor?.id}/lesson/${lessonId}`, {
            medalId: selectedMedal?.id || undefined,
            title,
          })
        ).data as ILessonOutput;

        if (icon?.startsWith("file")) {
          const key = await uploadMedia({
            endpoint: `/professor/${professor?.id}/lesson/${updatedLesson.id}/icon`,
            uri: icon,
            token,
          });

          if (!key) return navigation.goBack();
          setIcon(getMediaUrlFromS3Key(key));
        }

        setLesson(updatedLesson);
      } catch (error: any) {
        Alert.alert("Não foi possível criar aula", error?.message);
      } finally {
        return navigation.pop(2);
      }
    }

    return lessonId ? await updateLesson() : await createLesson();
  };

  const handleUpdateLevel = (levelId?: number) => {
    return navigation.navigate("ProfessorUpsertLessonLevelScreen", {
      lessonId,
      levelId,
    });
  };

  const handleDeleteLevel = () => {};

  const handleCreateLevel = () => {
    return navigation.navigate("ProfessorUpsertLessonLevelScreen", {
      lessonId,
      levelValue: lesson && lesson?.Levels && lesson?.Levels?.length + 1,
    });
  };

  const handleUploadIcon = async () => {
    try {
      Alert.alert(
        "Selecionar imagem",
        "Escolha como deseja selecionar a imagem:",
        [
          {
            text: "Câmera",
            onPress: async () =>
              uploadImageFromCamera({
                uploadToAws: false,
              })
                .then((uri) => {
                  if (!uri) throw new Error("Erro ao enviar imagem");
                  setIcon(getMediaUrlFromS3Key(uri));
                })
                .catch((error: any) => {
                  return Alert.alert(
                    "Não foi possível enviar a imagem",
                    error?.message
                  );
                }),
          },
          {
            text: "Galeria",
            onPress: async () =>
              uploadImageFromGallery({
                uploadToAws: false,
              })
                .then((key) => {
                  if (!key) throw new Error("Erro ao enviar imagem");
                  setIcon(getMediaUrlFromS3Key(key));
                })
                .catch((error: any) => {
                  return Alert.alert(
                    "Não foi possível enviar a imagem",
                    error?.message
                  );
                }),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Não foi possível enviar imagem", error?.message);
    }
  };

  const handleLevelAction = (level: ILessonLevelOutput) => {
    Alert.alert(
      `Nível ${level.level} selecionada.`,
      "Escolha a ação desejada:",
      [
        {
          text: "Editar",
          onPress: () => handleUpdateLevel(level.id),
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            // TODO: create remove lesson
            return Alert.alert(
              `Nível ${level.level} da aula "${lesson?.title}" será removida`
            );
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<ILessonLevelOutput>) => {
    return (
      <CardComponent
        width={"100%"}
        style={"primary"}
        children={
          <TouchableOpacity onPress={() => handleLevelAction(item)}>
            <Text style={styles.cardTitle}>{`Nível ${item.level}`}</Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity>
                <Text
                  style={[styles.cardButtonText, { color: "#1B9CFC" }]}
                  onPress={() => handleUpdateLevel(item.id)}
                >
                  {"editar"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={[styles.cardButtonText, { color: "#E3000E" }]}
                  onPress={handleDeleteLevel}
                >
                  {"excluir"}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        }
      />
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
        <Text style={styles.panelText}>{"Cadastrar aula"}</Text>
        <View style={styles.saveTextArea}>
          <TouchableOpacity onPress={handleSaveLesson}>
            <Text style={[styles.saveTextButton]}>{"salvar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.illustrativeImageSection}>
        <View
          style={{
            height: 150,
            width: 150,
          }}
        >
          <PhotoUploadImage
            source={icon ? { uri: icon } : undefined}
            onPress={handleUploadIcon}
          />
        </View>
      </View>
      <View style={styles.inputSections}>
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionText}>{"Tema/Categoria"}</Text>
          <TextInputComponent
            style={"secondary"}
            placeholder={"Digite o tema da aula"}
            height={50}
            value={title}
            onChangeText={handleUpdateTitle}
          />
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionText}>
            {"Medalha ao completar a aula"}
          </Text>
          <PickerComponent
            height={50}
            optionsList={medals}
            onPickerPress={handleTogglePicker}
            selectedOption={selectedMedal?.name || "Nenhuma"}
            isPickerVisible={isPickerVisible}
            onValueChange={handleMedalValueChange}
            style={"secondary"}
          />
        </View>
        {lessonId && (
          <View style={[styles.inputSection, styles.levelsCard]}>
            <Text style={styles.inputSectionText}>{"Níveis da aula"}</Text>
            {levels?.length ? (
              <FlatList data={levels} renderItem={renderItem} />
            ) : (
              <View style={styles.emptyLevelMessage}>
                <Text style={styles.emptyLevelMessageText}>
                  {"Nenhum nível criado :("}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      {lessonId && (
        <ButtonComponent
          title="criar novo nível"
          style="secondary"
          height={55}
          width={"90%"}
          onPress={handleCreateLevel}
          customStyle={{ marginTop: 15 }}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfessorUpsertLessonScreen;

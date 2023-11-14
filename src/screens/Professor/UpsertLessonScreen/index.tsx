import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, ListRenderItemInfo, Platform, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import api from "../../../utils/api";
import { ILesson, ILevel, IMedal, IProfessor } from "../../../interfaces";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import ButtonComponent from "../../../components/Button";
import PhotoUploadImage from "../../../components/PhotoUploadImage";
import TextInputComponent from "../../../components/input";
import PickerComponent from "../../../components/PickerComponent";
import CardComponent from "../../../components/CardComponent";
import {
  uploadImageFromCamera,
  uploadImageFromGallery,
} from "../../../services/mediaUpload";
import { getImageUrlFromS3Key, uploadImage } from "../../../utils/file";

type Props = NativeStackScreenProps<any>;

const ProfessorUpsertLessonScreen = ({ navigation, route }: Props) => {
  const os = Platform.OS;
  const { user, token } = useAuth();
  const lessonId: number | undefined = route.params?.lessonId;

  const [isPickerVisible, setPickerVisible] = useState(os === "android");
  const [professor, setProfessor] = useState<IProfessor | null>(null);
  const [medals, setMedals] = useState<Array<IMedal>>([]);
  const [lesson, setLesson] = useState<ILesson | null>(null);

  const [icon, setIcon] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedMedal, setSelectedMedal] = useState<IMedal | null>(null);
  const [levels, setLevels] = useState<Array<ILevel>>([]);

  useEffect(() => {
    async function fetchProfessorData() {
      if (!user) throw new Error("Usuário não encontrado");

      try {
        const { Professor } = (await api.get(`/user/${user?.sub}`))?.data;

        const professorData: IProfessor = (
          await api.get(`/professor/${Professor?.id}`)
        ).data;

        setProfessor(professorData);
        setMedals(professorData.Medals);
      } catch (error: any) {
        console.error(error);
        return Alert.alert(
          "Não foi possível obter dados do professor",
          error?.message
        );
      }
    }

    fetchProfessorData();
  }, [user]);

  useEffect(() => {
    async function fetchMedalData() {
      if (!professor) throw new Error("Professor não encontrado");

      try {
        const _medals: Array<IMedal> = (
          await api.get(`/professor/${professor.id}/medal`)
        ).data;

        setMedals(_medals);
      } catch (error: any) {
        console.error(error);
        return Alert.alert("Não foi possível obter medalhas", error?.message);
      }
    }

    async function fetchLessonData() {
      if (!professor) throw new Error("Professor não encontrado");
      if (!lessonId) return;

      try {
        const _lesson: ILesson = (
          await api.get(`/professor/${professor?.id}/lesson/${lessonId}`)
        ).data;

        setLesson(_lesson);
        setIcon(_lesson.icon);
        setTitle(_lesson.title);
        setSelectedMedal(_lesson.Medal);
        setLevels(_lesson.Medal);
      } catch (error: any) {
        console.error(error);
        return Alert.alert("Não foi possível obter medalhas", error?.message);
      }
    }

    fetchMedalData();
    fetchLessonData();
  }, [lessonId, professor?.id]);

  const handleGoBack = () => navigation.goBack();

  const handleTogglePicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  const handleChangeSelectedMedal = (value: IMedal | string) => {
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
    async function createLesson() {
      try {
        // TODO: add validations

        const _lesson = (
          await api.post(`/professor/${professor?.id}/lesson`, {
            medalId: selectedMedal?.id || undefined,
            title,
          })
        ).data as ILesson;

        const key = await uploadImage({
          endpoint: `/professor/${professor?.id}/lesson/${_lesson.id}/icon`,
          uri: icon,
          token,
        });

        setIcon(key);
        setLesson(_lesson);

        // TODO: refresh screen
        return navigation.navigate("ProfessorUpsertLessonScreen", {
          lessonId: _lesson.id,
        });
      } catch (error: any) {
        console.error(error);
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
        ).data as ILesson;

        setLesson(updatedLesson);
      } catch (error: any) {
        console.error(error);
        Alert.alert("Não foi possível criar aula", error?.message);
      } finally {
        return navigation.pop(2);
      }
    }

    return lessonId ? await updateLesson() : await createLesson();
  };

  const handleUpdateLevel = () => {};

  const handleDeleteLevel = () => {};

  const handleCreateLevel = () => {
    return navigation.navigate("ProfessorCreateLevelScreen");
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
                  setIcon(uri);
                })
                .catch((error: any) => {
                  console.error(error);
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
                  setIcon(key);
                })
                .catch((error: any) => {
                  console.error(error);
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
      console.error(error);
      Alert.alert("Não foi possível enviar imagem", error?.message);
    }
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ILevel>) => {
    return (
      <CardComponent
        key={index.toString()}
        width={"100%"}
        style={"primary"}
        children={
          <>
            <Text style={styles.cardTitle}>{`Nível ${item.level}`}</Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity>
                <Text
                  style={[styles.cardButtonText, { color: "#1B9CFC" }]}
                  onPress={handleUpdateLevel}
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
          </>
        }
      />
    );
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
            source={icon ? { uri: getImageUrlFromS3Key(icon) } : undefined}
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
            style={"secundary"}
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

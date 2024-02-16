import React, { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../utils/api";
import { getMediaUrlFromS3Key, uploadMedia } from "../../../utils/file";
import {
  uploadImageFromCamera,
  uploadImageFromGallery,
} from "../../../services/mediaUpload";
import {
  IMedalInput,
  IMedalOutput,
  IProfessor,
  IUserOutput,
} from "../../../interfaces";
import TextInputComponent from "../../../components/input";
import PhotoUploadImage from "../../../components/PhotoUploadImage";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { getErrorMessage } from "../../../utils/error";

type Props = NativeStackScreenProps<any>;

const ProfessorUpsertMedalScreen = ({ navigation, route }: Props) => {
  const medalId = route.params?.medalId;
  const { user, token } = useAuth();

  const [professor, setProfessor] = useState<IProfessor>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<string>();

  const init = async () => {
    try {
      if (!user) return;

      const { Professor } = (await api.get(`/user/${user.sub}`))
        .data as IUserOutput;

      const _professor = (await api.get(`/professor/${Professor?.id}`))
        .data as IProfessor;

      if (medalId) {
        const medal = (
          await api.get(`/professor/${_professor.id}/medal/${medalId}`)
        ).data as IMedalOutput;

        setName(medal.name);
        setDescription(medal.description);
        medal?.media && setMedia(getMediaUrlFromS3Key(medal.media));
      }

      setProfessor(_professor);
    } catch (error) {
      return Alert.alert(
        "Erro ao buscar dados da medalha",
        getErrorMessage(error)
      );
    }
  };

  useEffect(() => {
    init();
  }, [user, medalId]);

  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  const handleGoBack = () => navigation.goBack();
  const handleUpdateName = (text: string) => setName(text);
  const handleUpdateDescription = (text: string) => setDescription(text);

  const handleUploadMedia = async () => {
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
                  if (!uri) throw new Error("Nenhuma imagem selecionada");
                  setMedia(getMediaUrlFromS3Key(uri));
                })
                .catch((error: any) => {
                  throw error;
                }),
          },
          {
            text: "Galeria",
            onPress: async () =>
              uploadImageFromGallery({
                uploadToAws: false,
              })
                .then((key) => {
                  if (!key) throw new Error("Nenhuma imagem selecionada");
                  setMedia(getMediaUrlFromS3Key(key));
                })
                .catch((error: any) => {
                  throw error;
                }),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      Alert.alert("Não foi possível enviar imagem", getErrorMessage(error));
    }
  };

  const handleSaveLesson = async () => {
    Keyboard.dismiss();

    async function createMedal() {
      try {
        // TODO: add validations
        const body: IMedalInput = { name, description };

        const medal = (
          await api.post(`/professor/${professor?.id}/medal`, body)
        ).data as IMedalOutput;

        if (media) {
          const key = await uploadMedia({
            endpoint: `/professor/${professor?.id}/medal/${medal.id}/media`,
            uri: media,
            token,
          });

          if (!key) {
            await api.delete(`/professor/${professor?.id}/lesson/${medal.id}`);
            throw Error("Erro ao enviar imagem");
          }

          setMedia(getMediaUrlFromS3Key(key));
        }

        setName(medal.name);
        setDescription(medal.description);

        return navigation.navigate("ProfessorListMedal");
      } catch (error) {
        return Alert.alert(
          "Não foi possível criar aula",
          getErrorMessage(error)
        );
      }
    }

    async function updateLesson() {
      try {
        // TODO: add validations

        const body: Partial<IMedalInput> = { name, description };
        const medal = (
          await api.patch(`/professor/${professor?.id}/medal/${medalId}`, body)
        ).data as IMedalOutput;

        if (media?.startsWith("file")) {
          const key = await uploadMedia({
            endpoint: `/professor/${professor?.id}/medal/${medal.id}/media`,
            uri: media,
            token,
          });

          if (!key) throw Error("Erro ao enviar imagem");
          setMedia(getMediaUrlFromS3Key(key));
        }

        setName(medal.name);
        setDescription(medal.description);
      } catch (error) {
        return Alert.alert(
          "Não foi possível criar aula",
          getErrorMessage(error)
        );
      } finally {
        return navigation.pop(2);
      }
    }

    if (professor) {
      return medalId ? await updateLesson() : await createMedal();
    }
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
          {medalId ? "Editar medalha" : "Cadastrar medalha"}
        </Text>
        <View style={styles.saveTextArea}>
          <TouchableOpacity onPress={handleSaveLesson}>
            <Text style={[styles.saveTextButton]}>{"salvar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.illustrativeImageSection}>
        <View style={{ height: 150, width: 150 }}>
          <PhotoUploadImage
            source={media ? { uri: media } : undefined}
            onPress={handleUploadMedia}
          />
        </View>
      </View>
      <View style={styles.inputSections}>
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionText}>{"Título"}</Text>
          <TextInputComponent
            style={"secondary"}
            placeholder={"Digite o título da medalha"}
            height={48}
            value={name}
            onChangeText={handleUpdateName}
          />
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionText}>{"Descrição"}</Text>
          <TextInputComponent
            style={"secondary"}
            placeholder={"Digite a descrição da medalha"}
            height={48}
            value={description}
            onChangeText={handleUpdateDescription}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfessorUpsertMedalScreen;

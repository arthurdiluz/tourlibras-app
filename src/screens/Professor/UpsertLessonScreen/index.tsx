import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, ListRenderItemInfo, Platform, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";
import api from "../../../utils/api";
import { ILevel, IMedal, IProfessor } from "../../../interfaces";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import ButtonComponent from "../../../components/Button";
import PhotoUploadImage from "../../../components/PhotoUploadImage";
import TextInputComponent from "../../../components/input";
import PickerComponent from "../../../components/PickerComponent";
import CardComponent from "../../../components/CardComponent";

type Props = NativeStackScreenProps<any>;

const ProfessorUpsertLessonScreen = ({ navigation, route }: Props) => {
  const os = Platform.OS;
  const { user } = useAuth();
  const lessonId: number | undefined = route.params?.lessonId;
  console.log({ lessonId });

  const [professor, setProfessor] = useState<IProfessor | null>(null);
  const [medals, setMedals] = useState<Array<IMedal> | null>(null);
  const [selectedMedal, setSelectedMedal] = useState<IMedal | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(os === "android");
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

    async function fetchMedalData() {
      if (!professor) throw new Error("Professor não encontrado");

      try {
        const medals: Array<IMedal> = (
          await api.get(`/professor/${professor.id}/medal`)
        ).data;

        setMedals(medals);
      } catch (error: any) {
        console.error(error);
        return Alert.alert("Não foi possível obter medalhas", error?.message);
      }
    }

    fetchProfessorData().then(() => fetchMedalData());
  }, [user]);

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

  const handleMedalValueChange = (medal: string) => {
    handleChangeSelectedMedal(medal);
    os === "ios" && handleTogglePicker();
  };

  const handleUpdateLevel = () => {};

  const handleDeleteLevel = () => {};

  const handleCreateLevel = () => {
    return navigation.navigate("ProfessorCreateLevelScreen");
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
          <TouchableOpacity>
            <Text style={styles.saveTextButton}>{"salvar"}</Text>
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
          <PhotoUploadImage source={null} onPress={() => {}} />
        </View>
      </View>
      <View style={styles.inputSections}>
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionText}>{"Tema/Categoria"}</Text>
          <TextInputComponent
            style={"secondary"}
            placeholder={"Digite o tema da aula"}
            height={50}
          />
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputSectionText}>
            {"Medalha ao completar a aula"}
          </Text>
          <PickerComponent
            height={50}
            optionsList={medals || []}
            onPickerPress={handleTogglePicker}
            selectedOption={selectedMedal?.name || ""}
            isPickerVisible={isPickerVisible}
            onValueChange={handleMedalValueChange}
            style={"secundary"}
          />
        </View>
        {lessonId && (
          <View style={[styles.inputSection, styles.levelsCard]}>
            <Text style={styles.inputSectionText}>{"Níveis da aula"}</Text>
            {levels.length ? (
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

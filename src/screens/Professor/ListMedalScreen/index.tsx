import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, ListRenderItemInfo, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../../contexts/AuthContext";
import { IMedalOutput, IUserOutput } from "../../../interfaces";
import api from "../../../utils/api";
import styles from "./styles";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<any>;

const ProfessorListMedalScreen = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [medals, setMedals] = useState<IMedalOutput[]>([]);

  const init = async () => {
    if (!user) return;
    try {
      const { Professor } = (await api.get(`/user/${user.sub}`))
        .data as IUserOutput;

      const _medals: IMedalOutput[] = (
        await api.get(`/professor/${Professor?.id}/medal`)
      ).data as IMedalOutput[];

      setMedals(_medals);
    } catch (error: any) {
      return Alert.alert("Não foi possível obter as aulas", error?.message);
    }
  };

  useEffect(() => {
    user && init();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      user && init();
    }, [])
  );

  const handleGoBack = () => navigation.goBack();

  const handleMedal = (medal: IMedalOutput) => {
    return Alert.alert(
      `Medalha "${medal.name}" selecionada`,
      "O que deseja fazer com esta medalha?",
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
                        `/professor/${medal.professorId}/medal/${medal.id}`
                      );
                      setMedals((p) => p.filter((m) => m.id !== medal.id));
                    } catch (error: any) {
                      Alert.alert("Erro ao apagar medalha", error?.message);
                    }
                  },
                },
              ]
            ),
        },
        {
          text: "Editar",
          style: "default",
          onPress: () =>
            navigation.navigate("ProfessorUpsertMedal", {
              medalId: medal.id,
            }),
        },
        {
          text: "Cancelar",
          style: "cancel",
          isPreferred: true,
        },
      ]
    );
  };

  const renderItem = ({ item }: ListRenderItemInfo<IMedalOutput>) => {
    return (
      <View style={styles.renderItemLessonSection}>
        <TouchableOpacity
          style={styles.renderItemLessonImage}
          onPress={() => handleMedal(item)}
        >
          {!!item?.media?.length ? (
            <Image
              source={{ uri: getMediaUrlFromS3Key(item.media) }}
              height={96}
              width={96}
              resizeMode="cover"
              style={{ borderRadius: 50 }}
            />
          ) : (
            <MaterialCommunityIcons
              name="medal-outline"
              color={"#F1C40F"}
              size={96}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.renderItemLessonText}>{item.name}</Text>
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
        <Text style={styles.panelText}>{"Medalhas"}</Text>
      </View>
      {medals ? (
        <FlatList
          data={medals}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.flatListContentContainerStyle}
        />
      ) : (
        <View style={styles.emptyLevelMessage}>
          <Text style={styles.emptyLevelMessageText}>
            {"nenhuma medalha foi criada :("}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfessorListMedalScreen;

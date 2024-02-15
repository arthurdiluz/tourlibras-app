import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, ListRenderItemInfo, Text, View } from "react-native";
import api from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import {
  IGetItemOutput,
  IItemOutput,
  IStudent,
  IUserOutput,
} from "../../../interfaces";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import CardComponent from "../../../components/CardComponent";
import ButtonComponent from "../../../components/Button";
import { Ionicons } from "@expo/vector-icons";

const StudentStoreScreen = () => {
  const { user } = useAuth();

  const [student, setStudent] = useState<IStudent>();
  const [items, setItems] = useState<IItemOutput[]>([]);

  const init = async () => {
    try {
      if (!user) return;

      const { Student } = (await api.get(`/user/${user?.sub}`))
        .data as IUserOutput;
      const _student = (await api.get(`/student/${Student?.id}`))
        .data as IStudent;

      const _items = (await api.get(`/professor/${_student.professorId}/item`))
        .data as IItemOutput[];

      setStudent(_student);
      setItems(_items);
    } catch (error: any) {
      return Alert.alert("Não foi possível carregar os dados", error?.message);
    }
  };

  useEffect(() => {
    init();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  const handleGetItem = (item: IItemOutput) => {
    const getItem = async () => {
      try {
        if (!student || !item) return;
        const { Student } = (
          await api.post(`/student/${student.id}/item/${item.id}`)
        ).data as IGetItemOutput;

        setStudent((prev) => {
          if (!prev || !Student?.Items.length) return prev;
          return {
            ...prev,
            money: prev.money - item.price,
            Items: Student.Items,
          };
        });
      } catch (error: any) {
        if (error.response) {
          const { data } = error.response;
          return Alert.alert(
            `Não foi possível obter item "${item.name}"`,
            data.message || "Erro desconhecido"
          );
        } else {
          return Alert.alert(
            `Não foi possível obter item "${item.name}"`,
            error.message || "Erro desconhecido"
          );
        }
      }
    };

    return Alert.alert(
      `O item ${item.name} custa $${item.price}`,
      `Seu novo saldo será $${(student?.money ?? 0) - item.price}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Comprar",
          style: "default",
          isPreferred: true,
          onPress: getItem,
        },
      ]
    );
  };

  const renderItem = ({ item }: ListRenderItemInfo<IItemOutput>) => {
    const isItemOwned = !!student?.Items.find(
      ({ itemId }) => item.id === itemId
    );

    return (
      <CardComponent style="primary" customStyle={styles.flatListContainerCard}>
        <View style={styles.flatListContainerCardLeft}>
          {!!item?.media ? (
            <Image
              source={{ uri: item.media }}
              height={80}
              width={80}
              resizeMode="cover"
              style={styles.image}
            />
          ) : (
            <Ionicons name="trophy-sharp" size={80} color={"#F59E0B"} />
          )}
        </View>
        <View style={styles.flatListContainerCardRight}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <ButtonComponent
            title={`${item.price} $`}
            style={"secondary"}
            onPress={() => handleGetItem(item)}
            customStyle={{
              ...styles.itemButton,
              ...(isItemOwned && styles.itemButtonDisabled),
            }}
            disabled={isItemOwned}
          />
        </View>
      </CardComponent>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <Text style={styles.topMenuTitle}>{"Loja"}</Text>
        <View style={styles.topMenuRightSlot}>
          <Text style={styles.topMenuRightSlotText}>{student?.money ?? 0}</Text>
          <MaterialIcons name={"attach-money"} size={32} color={"#27ae60"} />
        </View>
      </View>
      {items.length ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          style={styles.flatListContainer}
          keyExtractor={({ id }) => id.toString()}
        />
      ) : (
        <View style={styles.noItemContainer}>
          <Text style={styles.noItemTitle}>{"Loja vazia :("}</Text>
          <Text style={styles.noItemSubTitle}>
            {"Infelizmente seu professor ainda não adicionou items à loja."}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StudentStoreScreen;

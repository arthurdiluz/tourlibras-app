import React from "react";
import { Image, Text, View, ListRenderItemInfo } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SafeAreaView } from "react-native-safe-area-context";
import { IStudent, IStudentMedal } from "../../../interfaces";
import { getMediaUrlFromS3Key } from "../../../utils/file";
import UserImageComponent from "../../../components/UserImage";
import CardComponent from "../../../components/CardComponent";
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import styles from "./styles";

type Props = NativeStackScreenProps<any>;

const StudentFriendProfileScreen = ({ navigation, route }: Props) => {
  const student: IStudent = JSON.parse(route.params?.student);

  const handleGoBack = () => navigation.goBack();

  const renderItem = ({ item, index }: ListRenderItemInfo<IStudentMedal>) => {
    return (
      <View
        style={[
          styles.medalCard,
          index === (student?.Medals?.length || 0) - 1 && {
            borderBottomColor: "#E2E8F0",
            borderBottomWidth: 1,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
          },
        ]}
      >
        <View style={styles.medalCardImageSection}>
          {!!item?.Medal?.media?.length ? (
            <Image
              source={{ uri: getMediaUrlFromS3Key(item.Medal.media) }}
              height={80}
              width={80}
              resizeMode="cover"
              style={{ borderRadius: 50 }}
            />
          ) : (
            <MaterialCommunityIcons
              name="medal-outline"
              color={"#F1C40F"}
              size={80}
            />
          )}
        </View>
        <View style={styles.medalCardSection}>
          <Text style={styles.medalCardSectionTitle}>{item.Medal.name}</Text>
          <Text style={styles.medalCardSectionSubTitle}>
            {item.Medal.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <Ionicons
          name="arrow-back"
          size={32}
          color={"#1B9CFC"}
          onPress={handleGoBack}
          style={{ position: "absolute", left: 0 }}
        />
        <Text style={styles.topMenuText}>{`Perfil de ${
          student.User.fullName.split(" ")[0]
        }`}</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.userSection}>
          <View style={styles.userSectionLeft}>
            <Text style={styles.userSectionLeftText1}>
              {student?.User.fullName}
            </Text>
            <View style={{ gap: 2.5 }}>
              <Text style={styles.userSectionLeftText2}>
                {student?.createdAt &&
                  `Entrou em ${formatRelative(student?.createdAt, new Date(), {
                    locale: ptBR,
                  })}`}
              </Text>
              <Text style={styles.userSectionLeftText3}>
                {student?.Professor?.grammar &&
                  `Aprendendo Libras com ${student?.Professor?.grammar}`}
              </Text>
            </View>
          </View>
          <View style={styles.userSectionRight}>
            <UserImageComponent
              style={"secondary"}
              source={
                student?.User?.profilePhoto
                  ? { uri: getMediaUrlFromS3Key(student.User.profilePhoto) }
                  : undefined
              }
            />
          </View>
        </View>
        <View style={styles.statisticSection}>
          <Text style={styles.sectionTitle}>{"Estatísticas"}</Text>
          <View style={styles.statisticSectionCards}>
            <CardComponent
              style="primary"
              customStyle={styles.statisticSectionCard}
            >
              <AntDesign name={"star"} size={38} color={"#F1C40F"} />
              <View style={styles.statisticSectionCardContent}>
                <Text style={styles.statisticSectionCardContentNumber}>
                  {student?.experience ?? 0}
                </Text>
                <Text style={styles.statisticSectionCardContentText}>
                  {"Experiência"}
                </Text>
              </View>
            </CardComponent>
            <CardComponent
              style="primary"
              customStyle={styles.statisticSectionCard}
            >
              <MaterialIcons
                name={"attach-money"}
                size={38}
                color={"#76FF03"}
              />
              <View style={styles.statisticSectionCardContent}>
                <Text style={styles.statisticSectionCardContentNumber}>
                  {student?.money ?? 0}
                </Text>
                <Text style={styles.statisticSectionCardContentText}>
                  {"Dinheiro"}
                </Text>
              </View>
            </CardComponent>
          </View>
        </View>
        <View style={styles.medalsSection}>
          <Text style={styles.sectionTitle}>{"Medalhas"}</Text>
          {student?.Medals?.length ? (
            <FlatList
              data={student.Medals || []}
              renderItem={renderItem}
              style={styles.flatListContainer}
              keyExtractor={({ id }) => id.toString()}
            />
          ) : (
            <View style={styles.noMedalSection}>
              <Text style={styles.noMedalSectionText}>
                {"Sem medalhas  :("}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StudentFriendProfileScreen;

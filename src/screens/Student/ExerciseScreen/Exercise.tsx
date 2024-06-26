import { ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import { IAlternativeOutput, ILevelExerciseOutput } from "../../../interfaces";
import VideoUploadImage from "../../../components/VideoUploadImage";
import { FlatList } from "react-native-gesture-handler";
import CardComponent from "../../../components/CardComponent";
import { getMediaUrlFromS3Key } from "../../../utils/file";

type Props = {
  exercise: ILevelExerciseOutput;
  handleForwardStep: (answer: boolean) => void;
};

export const Exercise = ({ exercise, handleForwardStep }: Props) => {
  if (!exercise) return <></>;

  const handlePress = (a: IAlternativeOutput) => handleForwardStep(a.isCorrect);

  const renderItem = ({ item }: ListRenderItemInfo<IAlternativeOutput>) => {
    return (
      <CardComponent
        customStyle={styles.card}
        onPress={() => handlePress(item)}
      >
        <Text style={styles.cardText}>{item.text}</Text>
      </CardComponent>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoArea}>
        <VideoUploadImage
          source={{ uri: getMediaUrlFromS3Key(exercise?.media) }}
        />
      </View>
      <Text style={styles.statement}>{exercise.statement}</Text>
      <FlatList
        data={exercise.Alternatives}
        renderItem={renderItem}
        style={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    marginTop: "5%",
  },

  videoArea: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 10,
  },

  statement: {
    maxWidth: "90%",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 20,
    marginBottom: "2.5%",
  },

  flatListContainer: {
    height: "100%",
    width: "90%",
  },

  card: {
    width: "95%",
    alignItems: "center",
    paddingVertical: "3%",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  cardText: {
    fontFamily: "Roboto",
    fontSize: 24,
  },
});

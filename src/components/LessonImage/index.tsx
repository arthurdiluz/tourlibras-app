import { Image, ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NumberProp } from "react-native-svg";
import LessonIcon from "../Icons/ClassIcon";
import styles from "./styles";

type Props = {
  height?: NumberProp;
  width?: NumberProp;
  style?: "primary" | "secundary";
  source?: ImageSourcePropType | null;
  onPress?: () => void;
};

const LessonImageComponent = ({
  source,
  onPress,
  height = "100%",
  width = "100%",
  style = "primary",
}: Props) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <LessonIcon
          style={styles.image}
          height={height}
          width={width}
          fill={style === "primary" ? "#fff" : "#1B9CFC"}
        />
      )}
    </TouchableOpacity>
  );
};

export default LessonImageComponent;

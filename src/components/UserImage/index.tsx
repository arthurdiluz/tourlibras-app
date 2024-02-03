import { Image, ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NumberProp } from "react-native-svg";
import UserIcon from "../Icons/UserIcon";
import styles from "./styles";

type Props = {
  source?: ImageSourcePropType | null;
  onPress?: () => void;
  style?: "primary" | "secondary";
  height?: NumberProp;
  width?: NumberProp;
};

const UserImageComponent = ({
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
        <UserIcon
          style={styles.image}
          height={height}
          width={width}
          fill={style === "primary" ? "#fff" : "#1B9CFC"}
        />
      )}
    </TouchableOpacity>
  );
};

export default UserImageComponent;

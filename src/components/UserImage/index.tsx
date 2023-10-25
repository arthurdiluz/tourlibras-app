import { Image, ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserIcon from "../Icons/UserIcon";
import styles from "./styles";

type Props = {
  source?: ImageSourcePropType | null;
  onPress?: () => void;
  style?: "primary" | "secundary";
};

const UserImageComponent = ({ source, onPress, style = "primary" }: Props) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <UserIcon
          style={styles.image}
          height={"100%"}
          width={"100%"}
          fill={style === "primary" ? "#fff" : "#1B9CFC"}
        />
      )}
    </TouchableOpacity>
  );
};

export default UserImageComponent;

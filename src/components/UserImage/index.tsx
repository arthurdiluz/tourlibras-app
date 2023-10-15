import { Image, ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserIcon from "../Icons/UserIcon";
import styles from "./styles";

type Props = {
  source?: ImageSourcePropType | null;
  onPress?: () => void;
};

const UserImageComponent = ({ source, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <UserIcon
          style={styles.image}
          height={"100%"}
          width={"100%"}
          fill={"#fff"}
        />
      )}
    </TouchableOpacity>
  );
};

export default UserImageComponent;

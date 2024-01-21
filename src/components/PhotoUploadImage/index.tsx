import { Image, ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PhotoUploadIcon from "../Icons/PhotoUpload";
import styles from "./styles";

type Props = {
  source?: ImageSourcePropType | null;
  onPress?: () => void;
};

const PhotoUploadImage = ({ source, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {source ? (
        <Image source={source} style={styles.image} resizeMode="cover" />
      ) : (
        <PhotoUploadIcon
          style={styles.image}
          height={"90%"}
          width={"90%"}
          fill={"#FFF"}
        />
      )}
    </TouchableOpacity>
  );
};

export default PhotoUploadImage;

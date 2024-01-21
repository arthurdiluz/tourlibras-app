import { Video, ResizeMode, AVPlaybackSource, AVPlaybackStatus } from "expo-av";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import PhotoUploadIcon from "../Icons/PhotoUpload";
import styles from "./styles";

interface Props {
  source?: AVPlaybackSource | null;
  onPress?: () => void;
}

const VideoUploadImage = ({ source, onPress }: Props) => {
  const [status, setStatus] = useState<AVPlaybackStatus>();

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {source ? (
        <Video
          source={source}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          isLooping={true}
          useNativeControls={true}
        />
      ) : (
        <PhotoUploadIcon
          style={styles.cover}
          height={"90%"}
          width={"90%"}
          fill={"#FFF"}
        />
      )}
    </TouchableOpacity>
  );
};

export default VideoUploadImage;

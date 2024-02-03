import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Video, ResizeMode, AVPlaybackSource } from "expo-av";
import VideoUploadIcon from "../Icons/VideoUpload";
import styles from "./styles";

interface Props {
  source?: AVPlaybackSource | null;
  onPress?: () => void;
}

const VideoUploadImage = ({ source, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.touchable, ...(source && { width: "60%" }) }}
      onPress={onPress}
    >
      {source ? (
        <Video
          source={source}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping={true}
          useNativeControls={true}
        />
      ) : (
        <View style={styles.cover}>
          <VideoUploadIcon height={130} width={130} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default VideoUploadImage;

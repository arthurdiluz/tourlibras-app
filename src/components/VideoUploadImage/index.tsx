import React, { useRef, useEffect } from "react";
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
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    };
    playVideo();
  }, []);

  return !!onPress ? (
    <TouchableOpacity
      style={{ ...styles.touchable, ...(source && { width: "60%" }) }}
      onPress={onPress}
    >
      {source ? (
        <Video
          ref={videoRef}
          source={source}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping={true}
          useNativeControls={true}
          isMuted={true}
        />
      ) : (
        <View style={styles.cover}>
          <VideoUploadIcon height={130} width={130} />
        </View>
      )}
    </TouchableOpacity>
  ) : (
    <View style={{ ...styles.touchable, ...(source && { width: "60%" }) }}>
      {source ? (
        <Video
          ref={videoRef}
          source={source}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping={true}
          useNativeControls={true}
          isMuted={true}
        />
      ) : (
        <View style={styles.cover}>
          <VideoUploadIcon height={130} width={130} />
        </View>
      )}
    </View>
  );
};

export default VideoUploadImage;

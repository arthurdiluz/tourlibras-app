import {
  ImagePickerOptions,
  requestCameraPermissionsAsync,
  PermissionStatus,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { CameraType, MediaTypeOptions } from "expo-image-picker";
import { Alert } from "react-native";
import { uploadImage } from "../../utils/file";

const imageOptions: ImagePickerOptions = {
  allowsEditing: true,
  allowsMultipleSelection: false,
  aspect: [1, 1],
  cameraType: CameraType.front,
  mediaTypes: MediaTypeOptions.Images,
  quality: 1,
};

type uploadImageType = {
  endpoint: string;
  token?: string | null;
};

export const uploadImageFromCamera = async ({
  endpoint,
  token,
}: uploadImageType) => {
  const cameraPermission = await requestCameraPermissionsAsync();

  if (cameraPermission.status !== PermissionStatus.GRANTED) {
    return Alert.alert(
      "Permissão necessária",
      "Por favor, permita o app acessar sua câmera."
    );
  }

  const selectedImage = await launchCameraAsync(imageOptions);

  if (selectedImage.assets) {
    const { uri } = selectedImage.assets[0];

    return uploadImage({
      endpoint,
      uri,
      token,
    })
      .then((key) => key)
      .catch((error: any) => {
        console.error(error);
        throw new Error(error);
      });
  }
};

export const uploadImageFromGallery = async ({
  endpoint,
  token,
}: uploadImageType) => {
  const galleryPermission = await requestMediaLibraryPermissionsAsync();

  if (galleryPermission.status !== PermissionStatus.GRANTED) {
    return Alert.alert(
      "Permissão necessária",
      "Por favor, permita o app acessar sua galeria."
    );
  }

  const selectedImage = await launchImageLibraryAsync(imageOptions);

  if (selectedImage.assets) {
    const { uri } = selectedImage.assets[0];

    return uploadImage({
      endpoint,
      uri,
      token,
    })
      .then((key) => key)
      .catch((error: any) => {
        console.error(error);
        throw new Error(error);
      });
  }
};

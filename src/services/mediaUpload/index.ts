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
  token?: string | null;
  endpoint?: string | null;
  uploadToAws?: boolean;
};

export const uploadImageFromCamera = async ({
  token,
  endpoint,
  uploadToAws = true,
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

    return uploadToAws
      ? endpoint &&
          uploadImage({
            endpoint,
            uri,
            token,
          })
            .then((key) => key)
            .catch((error: any) => {
              throw new Error(error);
            })
      : uri;
  }
};

export const uploadImageFromGallery = async ({
  token,
  endpoint,
  uploadToAws = true,
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

    return uploadToAws
      ? endpoint &&
          (await uploadImage({
            endpoint,
            uri,
            token,
          })
            .then((key) => key)
            .catch((error: any) => {
              throw new Error(error);
            }))
      : uri;
  }
};

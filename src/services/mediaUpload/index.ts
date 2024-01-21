import {
  ImagePickerOptions,
  requestCameraPermissionsAsync,
  PermissionStatus,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  CameraType,
  MediaTypeOptions,
  UIImagePickerControllerQualityType,
  UIImagePickerPresentationStyle,
} from "expo-image-picker";
import { Alert } from "react-native";
import { uploadMedia } from "../../utils/file";

interface UploadProps {
  token?: string | null;
  endpoint?: string | null;
  uploadToAws?: boolean;
}

const imageOptions: ImagePickerOptions = {
  allowsEditing: true,
  allowsMultipleSelection: false,
  aspect: [1, 1],
  cameraType: CameraType.front,
  mediaTypes: MediaTypeOptions.Images,
  quality: 1,
};

const videoOptions: ImagePickerOptions = {
  allowsEditing: true,
  allowsMultipleSelection: false,
  aspect: [9, 16],
  mediaTypes: MediaTypeOptions.Videos,
  videoQuality: UIImagePickerControllerQualityType.IFrame1280x720,
  videoMaxDuration: 10,
  presentationStyle: UIImagePickerPresentationStyle.AUTOMATIC,
};

const isPermissionGranted = async (
  source: "camera" | "gallery"
): Promise<boolean> => {
  const sourcePermission =
    source === "camera"
      ? await requestCameraPermissionsAsync()
      : await requestMediaLibraryPermissionsAsync();

  return sourcePermission.status === PermissionStatus.GRANTED;
};

export const uploadImageFromCamera = async ({
  token,
  endpoint,
  uploadToAws = true,
}: UploadProps) => {
  if (!(await isPermissionGranted("camera"))) {
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
          uploadMedia({
            endpoint,
            uri,
            token,
          })
            .then((key) => key)
            .catch((error: any) => {
              throw error;
            })
      : uri;
  }
};

export const uploadImageFromGallery = async ({
  token,
  endpoint,
  uploadToAws = true,
}: UploadProps) => {
  if (!(await isPermissionGranted("gallery"))) {
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
          (await uploadMedia({
            endpoint,
            uri,
            token,
          })
            .then((key) => key)
            .catch((error: any) => {
              throw error;
            }))
      : uri;
  }
};

export const uploadVideoFromGallery = async ({
  token,
  endpoint,
  uploadToAws = true,
}: UploadProps) => {
  if (!(await isPermissionGranted("gallery"))) {
    return Alert.alert(
      "Permissão necessária",
      "Por favor, permita o app acessar sua galeria."
    );
  }

  const selectedVideo = await launchImageLibraryAsync(videoOptions);

  if (selectedVideo.assets) {
    const { uri } = selectedVideo.assets[0];

    return uploadToAws
      ? endpoint &&
          (await uploadMedia({
            endpoint,
            uri,
            token,
          })
            .then((key) => key)
            .catch((error: any) => {
              throw error;
            }))
      : uri;
  }
};

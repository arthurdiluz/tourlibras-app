import { HttpStatusCode } from "axios";
import * as FileSystem from "expo-file-system";
import { baseURL } from "../constants";

type uploadImageType = {
  endpoint: string;
  uri: string;
  token?: string | null;
};

export const uploadImage = async ({
  endpoint,
  uri,
  token,
}: uploadImageType): Promise<string> => {
  const { body, status } = await FileSystem.uploadAsync(
    `${baseURL}${endpoint}`,
    uri,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "file",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    }
  );

  if (status !== HttpStatusCode.Created) throw new Error(body);

  return body;
};

export const getImageUrlFromS3Key = (key: string) => {
  return `https://tourlibras.s3.sa-east-1.amazonaws.com/${key}`.replace(
    /\\/g,
    "%5C"
  );
};

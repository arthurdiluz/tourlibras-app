import { HttpStatusCode } from "axios";
import {
  uploadAsync,
  FileSystemUploadOptions,
  FileSystemUploadType,
  FileSystemSessionType,
} from "expo-file-system";
import { baseURL } from "../constants";

type Props = {
  endpoint: string;
  uri: string;
  token?: string | null;
};

export const uploadMedia = async ({
  endpoint,
  uri,
  token,
}: Props): Promise<string | undefined> => {
  const options: FileSystemUploadOptions = {
    httpMethod: "POST",
    fieldName: "file",
    uploadType: FileSystemUploadType.MULTIPART,
    sessionType: FileSystemSessionType.BACKGROUND,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  };

  try {
    // TODO: fix
    const { body, status } = await uploadAsync(
      `${baseURL}${endpoint}`,
      uri,
      options
    );

    if (status !== HttpStatusCode.Created) throw new Error(body);

    return body;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMediaUrlFromS3Key = (key: string) => {
  return `https://tourlibras.s3.sa-east-1.amazonaws.com/${key}`.replace(
    /\\/g,
    "%5C"
  );
};

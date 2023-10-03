import React from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  DimensionValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native/types";
import styles from "./styles";

type StyleOptions = "primary" | "secondary";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  height?: DimensionValue;
  width?: DimensionValue;
  customStyle?: any;
  style?: StyleOptions;
}

const TextInputComponent: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  keyboardType,
  secureTextEntry,
  height,
  width,
  customStyle,
  style = "primary",
}: Props) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={{
        ...styles[style],
        ...styles["default"],
        ...customStyle,
        height,
        width,
      }}
      placeholderTextColor={style === "primary" ? "#FFF" : "#A0A0A0"}
    />
  );
};

export default TextInputComponent;

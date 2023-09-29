import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { DimensionValue, KeyboardTypeOptions } from "react-native/types";
import styles from "./styles";

type StyleOptions = "primary" | "secondary";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
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
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={{ height, width, ...styles[style], ...customStyle }}
      placeholderTextColor={style === "primary" ? "#FFF" : "#A0A0A0"}
    />
  );
};

export default TextInputComponent;

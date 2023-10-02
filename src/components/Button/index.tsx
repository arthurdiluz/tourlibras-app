import React from "react";
import { TouchableOpacity, Text, DimensionValue } from "react-native";
import styles from "./styles";

type StyleOptions = "primary" | "secondary";

interface Props {
  title: string;
  onPress?: () => void;
  height?: DimensionValue;
  width?: DimensionValue;
  customStyle?: any;
  disabled?: boolean;
  style?: StyleOptions;
}

const ButtonComponent: React.FC<Props> = ({
  title,
  onPress,
  height,
  width,
  customStyle,
  disabled,
  style = "primary",
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ ...styles[style], ...customStyle, height, width }}
    >
      <Text style={styles[`${style}Text`]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

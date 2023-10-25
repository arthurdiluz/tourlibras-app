import React from "react";
import { TouchableOpacity, Text, DimensionValue } from "react-native";
import styles from "./styles";

type StyleOptions = "primary" | "secondary" | "tertiary" | "warning";

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
  height = 60,
  width = "100%",
  customStyle,
  disabled,
  style = "primary",
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.default,
        ...styles[style],
        ...customStyle,
        height,
        width,
      }}
    >
      <Text
        style={{
          ...styles.defaultText,
          ...styles[`${style}Text`],
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

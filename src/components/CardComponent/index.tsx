import React from "react";
import { DimensionValue, View, TouchableOpacity } from "react-native";
import styles from "./styles";

type StyleOptions = "primary" | "secondary";

type Props = {
  height?: DimensionValue | null;
  width?: DimensionValue | null;
  style?: StyleOptions;
  onPress?: () => void;
  customStyle?: any;
  children: React.ReactNode;
};

const CardComponent = ({
  height = "100%",
  width = "100%",
  style = "primary",
  onPress,
  customStyle,
  children,
}: Props) => {
  const cardStyles = [
    styles.defaultBox,
    styles[`${style}Box`],
    { height, width },
    customStyle,
  ];

  return !!onPress ? (
    <TouchableOpacity onPress={onPress} style={cardStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={cardStyles}>{children}</View>
  );
};

export default CardComponent;

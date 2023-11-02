import React, { Children } from "react";
import { DimensionValue, Text, View } from "react-native";
import styles from "./styles";

type StyleOptions = "primary" | "secundary";

type Props = {
  height?: DimensionValue | null;
  width?: DimensionValue | null;
  style?: StyleOptions;
  customStyle?: any;
  children: React.ReactNode;
};

const CardComponent = ({
  height = "100%",
  width = "100%",
  style = "primary",
  customStyle,
  children,
}: Props) => {
  return (
    <View
      style={[
        styles.defaultBox,
        styles[`${style}Box`],
        { height, width },
        customStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default CardComponent;

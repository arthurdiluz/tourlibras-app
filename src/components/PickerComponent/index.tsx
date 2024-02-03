import React from "react";
import { DimensionValue, Platform, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
  optionsList: Array<any>;
  selectedOption: string;
  isPickerVisible: boolean;
  isItemEnabled?: boolean | undefined;
  onValueChange: (value: any) => void;
  onPickerPress: () => void;
  key?: string | undefined;
  style?: "primary" | "secondary";
};

const PickerComponent = ({
  optionsList,
  selectedOption,
  isPickerVisible,
  onPickerPress,
  onValueChange,
  isItemEnabled = true,
  height = "100%",
  width = "100%",
  key = "name",
  style = "primary",
}: Props) => {
  const os = Platform.OS;

  return (
    <View
      style={[
        { width },
        isPickerVisible ? { height: 300 } : { height },
        styles[`${style}OptionSectionSelect`],
        styles.DefaultOptionSectionSelect,
      ]}
    >
      {os === "ios" && (
        <TouchableOpacity onPress={onPickerPress} style={styles.iosSelect}>
          <Text style={styles.iosSelectText}>
            {selectedOption === "" ? "Selecione:" : selectedOption}
          </Text>
        </TouchableOpacity>
      )}
      {isPickerVisible && (
        <Picker selectedValue={selectedOption} onValueChange={onValueChange}>
          {optionsList.map((option, index) => (
            <Picker.Item
              enabled={isItemEnabled}
              key={`${index}-${option[key]}`}
              label={option[key]}
              value={option[key]}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default PickerComponent;

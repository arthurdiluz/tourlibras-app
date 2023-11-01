import React from "react";
import { Platform, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";

type OptionListValue = { value: string; label: string };

type Props = {
  optionsList: Array<OptionListValue>;
  selectedOption: string;
  isPickerVisible: boolean;
  isItemEnabled: boolean;
  onValueChange: (value: string) => void;
  onPickerPress: () => void;
};

const PickerComponent = ({
  optionsList,
  selectedOption,
  isPickerVisible,
  isItemEnabled,
  onPickerPress,
  onValueChange,
}: Props) => {
  const os = Platform.OS;

  return (
    <View style={styles.optionSectionSelect}>
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
              key={`option-${index}`}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default PickerComponent;

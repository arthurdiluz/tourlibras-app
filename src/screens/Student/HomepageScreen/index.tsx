import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<any>;

const StudentHomepageScreen = ({ navigation, route }: any) => {
  return (
    <SafeAreaView>
      <Text>{"Estudante"}</Text>
    </SafeAreaView>
  );
};

export default StudentHomepageScreen;

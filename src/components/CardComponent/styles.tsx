import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  defaultBox: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { height: 4, width: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  primaryBox: {
    backgroundColor: "white",
    borderColor: "#D9D9D9",
  },

  secondaryBox: {},
});

export default styles;

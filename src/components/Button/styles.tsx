import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  default: {
    borderRadius: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 5,
    padding: 18,
  },

  defaultText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto Bold",
    fontSize: 20,
    textTransform: "capitalize",
  },

  primary: {
    backgroundColor: "#FFF",
  },

  primaryText: {
    color: "#1B9CFC",
  },

  secondary: {
    backgroundColor: "#1B9CFC",
    shadowOpacity: 0.1,
    shadowOffset: { height: 0, width: 0 },
  },

  secondaryText: {},

  tertiary: {
    backgroundColor: "#1B1464",
  },

  tertiaryText: {},

  warning: {
    backgroundColor: "#E3000E",
  },

  warningText: {},
});

export default styles;

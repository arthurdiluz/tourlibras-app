import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  default: {
    borderRadius: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 5,
    paddingVertical: "2%",
    paddingHorizontal: 2,
  },

  defaultText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto Bold",
    fontSize: 20,
    textTransform: "uppercase",
  },

  primary: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    shadowOpacity: 0.1,
    shadowRadius: 2,
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

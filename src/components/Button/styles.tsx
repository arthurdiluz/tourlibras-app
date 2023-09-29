import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  primary: {
    borderRadius: 50,
    backgroundColor: "#FFF",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 5,
  },

  primaryText: {
    color: "#1B9CFC",
    textAlign: "center",
    fontFamily: "Roboto Bold",
    fontSize: 20,
  },

  secondary: {
    borderRadius: 50,
    backgroundColor: "#1B9CFC",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 5,
  },

  secondaryText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto Bold",
    fontSize: 20,
  },
});

export default styles;

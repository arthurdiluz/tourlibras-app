import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#1B9CFC",
  },

  panelNameText: {
    marginTop: 40,
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "700",
  },

  imageSection: {
    height: 220,
    width: 220,
    marginTop: 50,
  },

  menuButtons: {
    width: "80%",
    gap: 20,
    marginTop: 50,
  },

  goBackButton: {
    flex: 1,
    width: "80%",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
});

export default styles;

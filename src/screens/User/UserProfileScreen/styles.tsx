import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  scrollContainer: {
    flex: 1,
    width: "90%",
  },

  topMenu: {
    height: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  ArrowLeft: {
    position: "absolute",
    left: 0,
  },

  panelText: {
    color: "#1B9CFC",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "600",
  },

  imageSection: {
    height: 220,
    width: 220,
    marginVertical: 25,
  },

  inputFields: {
    width: "100%",
    gap: 25,
  },

  inputField: {
    gap: 10,
  },

  inputLabel: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "600",
  },

  actionButtons: {
    width: "90%",
    marginVertical: 10,
    gap: 10,
    paddingHorizontal: 1,
  },
});

export default styles;

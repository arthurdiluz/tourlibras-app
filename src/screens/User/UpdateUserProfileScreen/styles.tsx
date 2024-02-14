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

  topMenu: {
    height: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
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

  emailSection: {
    width: "90%",
    gap: 10,
    marginBottom: 40,
  },

  emailSectionText: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "600",
  },

  passwordSection: {
    width: "90%",
    gap: 10,
  },

  passwordSectionText: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: "1%",
  },

  passwordSectionTextTip: {
    color: "#464646",
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "600",
  },

  actionButtons: {
    flex: 1,
    width: "90%",
    gap: 10,
    justifyContent: "flex-end",
  },
});

export default styles;

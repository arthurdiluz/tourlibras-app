import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  topMenu: {
    height: "5%",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  stepCounter: {
    color: "#1B9CFC",
    fontFamily: "Roboto Bold",
    fontSize: 20,
  },

  exerciseScreen: {
    height: "100%",
    width: "100%",
  },

  resultScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  resultScreenSection: {
    alignItems: "center",
    gap: 20,
    marginVertical: "15%",
  },

  resultScreenSectionText: {
    textTransform: "uppercase",
    fontFamily: "Roboto Bold",
    fontSize: 48,
  },

  resultScreenSectionReasonText1: {
    fontSize: 24,
    fontWeight: "400",
  },

  resultScreenSectionReasonText2: {
    fontSize: 20,
    fontWeight: "300",
  },
});

export default styles;

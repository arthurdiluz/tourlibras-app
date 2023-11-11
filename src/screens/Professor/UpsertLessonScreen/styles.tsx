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
    height: "10%",
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
  },

  ArrowLeft: {
    position: "absolute",
  },

  panelText: {
    color: "#1B9CFC",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "600",
  },

  saveTextArea: {
    position: "absolute",
    right: 0,
  },

  saveTextButton: {
    color: "#1B9CFC",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "600",
  },

  inputSections: {
    flex: 1,
    width: "90%",
    gap: 25,
  },

  illustrativeImageSection: {
    width: "100%",
    alignItems: "center",
    gap: 25,
    marginBottom: 30,
  },

  inputSection: {
    width: "100%",
    gap: 10,
  },

  inputSectionText: {
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "600",
  },

  emptyLevelMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyLevelMessageText: {
    color: "black",
    fontFamily: "Roboto Bold",
    fontSize: 24,
    textTransform: "uppercase",
  },

  levelsCard: {
    flex: 1,
  },

  cardTitle: {
    marginVertical: 15,
    marginHorizontal: 20,
    color: "#000",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "600",
  },

  cardButtons: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    columnGap: 32,
    alignItems: "flex-end",
    marginVertical: 15,
    marginHorizontal: 20,
  },

  cardButtonText: {
    fontFamily: "Roboto Bold",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

export default styles;

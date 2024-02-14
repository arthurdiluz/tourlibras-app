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
    textTransform: "uppercase",
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

  inputsSection: {
    marginVertical: 25,
    gap: 20,
  },

  inputSection: {
    gap: 10,
  },

  inputSectionText: {
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

  flatListContainer: {
    flex: 1,
  },

  card: {
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },

  cardHeaderSubTitle: {
    fontFamily: "Roboto",
    fontWeight: "100",
    fontSize: 16,
    color: "#7F8C8D",
  },

  cardHeaderTitle: {
    fontFamily: "Roboto",
    fontSize: 22,
  },

  cardActionButtons: {
    flexDirection: "row",
    gap: 32,
  },

  cardActionButtonsEdit: {
    fontFamily: "Roboto Bold",
    fontSize: 16,
    color: "#1B9CFC",
    textTransform: "uppercase",
  },

  cardActionButtonsDelete: {
    fontFamily: "Roboto Bold",
    fontSize: 16,
    color: "#E3000E",
    textTransform: "uppercase",
  },
});

export default styles;

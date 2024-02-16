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
    fontFamily: "Roboto Bold",
    fontSize: 24,
    fontWeight: "600",
  },

  saveTextArea: {
    position: "absolute",
    right: 0,
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

  flatListContentContainerStyle: {
    alignItems: "center",
  },

  renderItemLessonSection: {
    marginHorizontal: 48,
    marginVertical: 24,
  },

  renderItemLessonImage: {
    alignItems: "center",
    justifyContent: "center",
  },

  renderItemLessonText: {
    fontFamily: "Roboto",
    fontSize: 20,
    textAlign: "center",
    marginTop: 8,
  },
});

export default styles;

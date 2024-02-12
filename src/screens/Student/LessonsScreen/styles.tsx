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

  header: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    gap: 5,
  },

  headerTitle: {
    fontFamily: "Roboto Bold",
    textAlign: "center",
    fontSize: 24,
    color: "#1B9CFC",
  },

  headerSubTitle: {
    fontWeight: "200",
    textAlign: "center",
    fontSize: 14,
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
    marginHorizontal: 50,
    marginVertical: 25,
    gap: 10,
  },

  renderItemLessonImage: {
    height: 100,
    width: 100,
  },

  renderItemLessonText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "600",
  },

  renderItemLessonLevelBubble: {
    position: "absolute",
    backgroundColor: "#1B9CFC",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    right: "5%",
    bottom: "25%",
  },

  renderItemLessonLevelBubbleText: {
    fontFamily: "Roboto Bold",
    fontSize: 20,
    color: "white",
  },
});

export default styles;

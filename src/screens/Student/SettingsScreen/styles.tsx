import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B9CFC",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  subContainer: {
    height: "75%",
    width: "90%",
    alignItems: "center",
  },

  imageSection: {
    height: 220,
    width: 220,
    marginVertical: 25,
  },

  userName: {
    fontFamily: "Roboto Bold",
    fontSize: 32,
    color: "#FFF",
    textAlign: "center",
    marginTop: 2,
  },

  actionButtons: {
    flex: 1,
    width: "90%",
    justifyContent: "flex-end",
    marginVertical: 8,
    paddingHorizontal: 4,
    gap: 16,
  },
});

export default styles;

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

  videoArea: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 10,
  },

  flexContainer: {
    width: "90%",
    flex: 1,
  },

  inputCustomStyle: {
    borderRadius: 16,
    marginBottom: 20,
  },

  flatListContainer: {
    flex: 1,
  },

  card: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },

  cardTitle: {
    fontFamily: "Roboto Bold",
    fontSize: 20,
    fontWeight: "bold",
  },

  checkboxSection: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  checkbox: {
    borderRadius: 8,
  },

  checkboxText: {
    fontFamily: "Roboto",
    fontSize: 18,
  },

  cleanButton: {
    fontFamily: "Roboto Bold",
    fontSize: 16,
    color: "#E3000E",
    marginBottom: 5,
  },
});

export default styles;

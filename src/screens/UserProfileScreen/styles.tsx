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
    height: "10%",
    width: "100%",
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

  optionSectionSelect: {
    width: "100%",
    borderRadius: 10,
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "400",
    borderWidth: 2,
    borderColor: "#D9D9D9",
  },

  iosSelect: {
    height: 50,
    justifyContent: "center",
  },

  iosSelectText: {
    paddingLeft: "5%",
  },

  actionButtons: {
    width: "100%",
    marginVertical: 10,
    gap: 10,
  },
});

export default styles;

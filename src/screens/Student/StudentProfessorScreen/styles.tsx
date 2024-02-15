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
    flexDirection: "row",
    alignItems: "center",
  },

  topMenuText: {
    fontFamily: "Roboto Bold",
    fontSize: 24,
    color: "#1B9CFC",
    textTransform: "uppercase",
  },

  ArrowLeft: {
    position: "absolute",
    left: 0,
  },

  professorSection: {
    flex: 2,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  professorSectionLeft: {
    height: "100%",
    width: "60%",
    justifyContent: "space-around",
  },

  professorSectionLeftText1: {
    fontFamily: "Roboto Bold",
    fontSize: 26,
  },

  professorSectionLeftText2: {
    fontFamily: "Roboto Bold",
    fontSize: 16,
    color: "#A0A0A0",
  },

  professorSectionLeftText3: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#A0A0A0",
  },

  professorSectionRight: {
    flex: 1,
    height: "100%",
    alignItems: "flex-end",
    paddingTop: 4,
  },

  sectionTitle: {
    fontFamily: "Roboto Bold",
    fontSize: 26,
  },

  statisticSection: {
    paddingTop: 8,
    flex: 2,
    width: "90%",
  },

  statisticSectionCards: {
    height: 100,
    flexDirection: "row",
    gap: 8,
  },

  statisticSectionCard: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 8,
  },

  statisticSectionCardContent: {
    justifyContent: "space-between",
    paddingHorizontal: 2,
    paddingBottom: 8,
  },

  statisticSectionCardContentNumber: {
    fontFamily: "Roboto Bold",
    fontSize: 28,
    marginTop: 2.5,
  },

  statisticSectionCardContentText: {
    fontFamily: "Roboto Bold",
    fontSize: 22,
    color: "#A0A0A0",
  },

  emailSection: {
    flex: 3,
    width: "90%",
    paddingTop: 16,
  },
});

export default styles;

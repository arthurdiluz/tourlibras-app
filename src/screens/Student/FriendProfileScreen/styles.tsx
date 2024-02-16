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
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  topMenuText: {
    fontFamily: "Roboto Bold",
    fontSize: 24,
    color: "#1B9CFC",
  },

  topMenuIcon: {
    position: "absolute",
    right: 0,
  },

  main: {
    flex: 1,
    justifyContent: "space-between",
  },

  userSection: {
    height: "15%",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  userSectionLeft: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },

  userSectionLeftText1: {
    fontFamily: "Roboto Bold",
    fontSize: 26,
  },

  userSectionLeftText2: {
    fontFamily: "Roboto Bold",
    fontSize: 16,
    color: "#A0A0A0",
  },

  userSectionLeftText3: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#A0A0A0",
  },

  userSectionRight: {
    height: 120,
    width: 120,
    marginLeft: "5%",
  },

  sectionTitle: {
    fontFamily: "Roboto Bold",
    fontSize: 26,
  },

  statisticSection: {
    marginTop: 20,
    height: "20%",
    justifyContent: "center",
  },

  statisticSectionCards: {
    height: 100,
    flexDirection: "row",
    gap: 10,
  },

  statisticSectionCard: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },

  statisticSectionCardContent: {
    justifyContent: "space-between",
  },

  statisticSectionCardContentNumber: {
    fontFamily: "Roboto Bold",
    fontSize: 26,
    marginTop: 2.5,
  },

  statisticSectionCardContentText: {
    fontFamily: "Roboto Bold",
    fontSize: 18,
    color: "#A0A0A0",
  },

  medalsSection: {
    flex: 1,
    marginTop: 32,
  },

  noMedalSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  noMedalSectionText: {
    color: "#A0A0A0",
    fontWeight: "200",
    fontSize: 48,
  },

  flatListContainer: {
    flex: 1,
    marginTop: 15,
  },

  medalCard: {
    height: 100,
    width: "100%",
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    gap: 10,
    borderBottomColor: "#F1F5F9",
    borderBottomWidth: 1,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },

  medalCardImageSection: {
    width: "25%",
  },

  medalCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 16,
  },

  medalCardSection: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-around",
  },

  medalCardSectionTitle: {
    fontFamily: "Roboto Bold",
    fontSize: 22,
  },

  medalCardSectionSubTitle: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#A0A0A0",
  },
});

export default styles;

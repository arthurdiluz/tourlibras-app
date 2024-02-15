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

  panelText: {
    color: "#1B9CFC",
    textAlign: "center",
    fontFamily: "Roboto Bold",
    fontSize: 24,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  flexContainer: {
    width: "90%",
    flex: 1,
  },

  inputCustomStyle: {
    borderRadius: 16,
  },

  flatListContainer: {
    flex: 1,
    marginTop: 16,
    borderColor: "#f1f8ff",
    borderWidth: 2,
    borderRadius: 16,
  },

  listHeaderComponent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: "6%",
    marginTop: 16,
  },

  listHeaderComponentButtons: {
    flexDirection: "row",
    borderColor: "#F5F5F4",
    borderWidth: 0.5,
    borderRadius: 16,
  },

  listHeaderComponentButton: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  listHeaderComponentActiveButton: {
    backgroundColor: "#1B9CFC",
  },

  listHeaderComponentInactiveButton: {
    backgroundColor: "#F8FAFC",
  },

  listHeaderComponentButtonText: {
    fontFamily: "Roboto Bold",
    fontSize: 16,
    color: "#A0A0A0",
  },

  card: {
    height: 100,
    width: "100%",
    gap: 8,
    flexDirection: "row",
    marginVertical: 2.5,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  cardIndex: {
    fontSize: 20,
    fontFamily: "Roboto",
    marginRight: 8,
    marginLeft: 4,
  },

  cardPhoto: {
    height: 80,
    width: 80,
    marginRight: 8,
  },

  cardMiddle: {
    justifyContent: "center",
    gap: 5,
  },

  cardMiddleText: {
    fontSize: 16,
    fontFamily: "Roboto Bold",
    color: "#A0A0A0",
  },

  cardRight: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 8,
  },

  cardMetricsItemsText: {
    fontSize: 16,
    fontFamily: "Roboto",
  },
});

export default styles;

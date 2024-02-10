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
    height: "6%",
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  panelText: {
    color: "#1B9CFC",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  ArrowLeft: {
    position: "absolute",
  },

  flexContainer: {
    width: "90%",
    flex: 1,
  },

  inputCustomStyle: {
    borderRadius: 10,
    marginBottom: 20,
  },

  flatListContainer: {
    flex: 1,
    marginTop: 40,
    borderColor: "#f1f8ff",
    borderWidth: 2,
    borderRadius: 10,
  },

  searchOptions: {
    gap: 5,
  },

  searchOptionsText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#000",
  },

  listHeaderComponent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: "6%",
    marginTop: 10,
  },

  listHeaderComponentButtons: {
    flexDirection: "row",
    borderColor: "#F5F5F4",
    borderWidth: 0.5,
    borderRadius: 10,
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
    gap: 10,
    flexDirection: "row",
    marginVertical: 2.5,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cardPhoto: {
    height: 80,
    width: 80,
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

  cardMiddleSubText: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: "#A0A0A0",
  },

  cardMetrics: {
    flex: 1,
    alignItems: "flex-end",
    gap: 10,
  },

  cardMetricsItems: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  cardMetricsItemsText: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#A0A0A0",
  },
});

export default styles;

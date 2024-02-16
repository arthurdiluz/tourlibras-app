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
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  topMenuTitle: {
    position: "absolute",
    left: "45%",
    fontFamily: "Roboto Bold",
    fontSize: 24,
    color: "#1B9CFC",
  },

  topMenuRightSlot: {
    flexDirection: "row",
    alignItems: "center",
  },

  topMenuRightSlotText: {
    fontFamily: "Roboto",
    fontSize: 24,
  },

  noItemContainer: {
    flex: 1,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  noItemTitle: {
    fontSize: 32,
    fontWeight: "200",
  },

  noItemSubTitle: {
    color: "#475569",
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },

  flatListContainer: {
    flex: 1,
    width: "90%",
    padding: 8,
  },

  flatListContainerCard: {
    flexDirection: "row",
    padding: 16,
    gap: 24,
  },

  flatListContainerCardLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  flatListContainerCardRight: {
    flex: 3,
    gap: 8,
  },

  image: {
    borderRadius: 12,
    borderColor: "#F59E0B",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto Bold",
    fontSize: 24,
    color: "#27272A",
  },

  itemDescription: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#525252",
  },

  itemButton: {
    marginTop: 8,
    borderRadius: 12,
  },

  itemButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
});

export default styles;

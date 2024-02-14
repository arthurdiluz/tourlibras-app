import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#1B9CFC",
  },

  ArrowLeft: {
    position: "absolute",
    top: "8%",
    left: 20,
  },

  firstSection: {
    height: "40%",
    width: "80%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 33,
  },

  firstSectionText: {
    color: "#FFF",
    textAlign: "left",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "700",
    width: "50%",
  },

  secondSection: {
    marginTop: 25,
    width: "60%",
  },

  secondSectionText: {
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 0.4,
  },

  thirdSection: {
    marginTop: 60,
    width: "75%",
    gap: 15,
  },
});

export default styles;

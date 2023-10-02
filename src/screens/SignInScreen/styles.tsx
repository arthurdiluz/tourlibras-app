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

  userCircle: {
    paddingTop: 20,
    display: "flex",
    alignItems: "center",
  },

  signInSection: {
    width: "80%",
    marginTop: 46,
  },

  signInSectionText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "400",
    paddingBottom: 24,
  },

  inputFields: {
    width: "100%",
    height: 130,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  passwordToggle: {
    position: "relative",
    right: "75%",
  },

  forgotPasswordText: {
    color: "#FFF",
    textAlign: "right",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
    marginTop: 8,
    marginRight: 14,
  },

  buttonsSection: {
    marginVertical: 35,
    gap: 25,
  },

  signUpText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});

export default styles;

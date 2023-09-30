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
    top: "10%",
    left: 20,
  },

  userCircle: {
    paddingTop: 20,
    display: "flex",
    alignItems: "center",
  },

  signUpSection: {
    width: "80%",
    marginTop: 46,
    alignItems: "center",
  },

  signUpSectionText: {
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
    right: "200%",
  },

  roleToggleSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingTop: 20,
  },

  roleToggleSectionText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "600",
  },

  professorOptionSection: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#1B9CFC",
    borderRadius: 25,
    justifyContent: "center",
    shadowColor: "#1B1464",
    shadowOpacity: 0.2,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 6,
  },

  professorOptionSectionText: {
    width: "75%",
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
  },

  professorOptionSectionSelect: {
    padding: 25,
    height: 60,
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#FFF",
    marginTop: 35,
    justifyContent: "center",
  },

  buttonSection: {
    width: "100%",
    marginVertical: 35,
  },
});

export default styles;

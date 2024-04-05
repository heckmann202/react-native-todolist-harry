import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
  },
  pressable: {
    position: "absolute",
    bottom: 60,
    right: 20,
    backgroundColor: "#C2DAFF",
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  text: {
    color: "#2F76E5",
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 15,
  }
});

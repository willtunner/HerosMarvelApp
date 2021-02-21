import { StyleSheet } from "react-native";

const css = StyleSheet.create({
  Container: {
    backgroundColor: "#fff",
  },
  Banner: {
    width: "100%",
    height: 150,
    marginBottom: 1,
  },
  ViewBorder: {
    backgroundColor: "#EC1D24",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  txtName: {
    color: "#FFF",
    fontSize: 20,
  },
  ViewDesc: {
    alignItems: "center",
    marginTop: 10,
  },
  Desc: {
    backgroundColor: "#1E2E44",
    width: "95%",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  TextDesc: {
    color: "#FFF",
    textAlign: "justify",
  },
  ViewInfo: {
    backgroundColor: "#FFF",
  },
  ViewComic: {
    justifyContent: "center",
  },
  FlatComic: {
    marginBottom: 10,
  },
  txtComic: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
  },
  BackTouchableOpacity: {
    backgroundColor: "#ec1d24",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    bottom: 0,
    flex: 1,
    width: "100%",
  },
});

export { css };

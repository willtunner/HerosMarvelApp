import { StyleSheet } from "react-native";

const css = StyleSheet.create({
  Container: {
    backgroundColor: "#151F2D",
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
    borderRadius: 15,
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
    marginBottom: 10
  },
  ViewId: {
    backgroundColor: "#335AF9",
    alignItems: "center",
  },
  txtId: {
    color: "#fff",
    fontSize: 20,
  },
  ViewComic: {
    backgroundColor: '#7791FB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtComic: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
  },
});

export { css };

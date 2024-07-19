import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  h1: {
    fontSize: "36px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    margin: "8px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    width: "90%",
  },
  leftContainer: {
    width: "60%",
  },
  rightContainer: {
    width: "60%",
  },
  table: {
    width: "70%",
    margin: "4px auto",
  },
  row: {
    display: "flex",
    border: "1px solid #ccc",
  },
  col: {
    border: "1px solid #ccc",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "52px",
    height: "128px auto",
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  button: {
    width: "280px",
    height: "90px auto",
    fontSize: "24px",
  },
  root: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "75%",
    padding: "0 auto",
  },
});

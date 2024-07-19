import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  h1: {
    fontSize: "36px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    margin: "16px",
  },
  table: {
    width: "80%",
    marginTop: "16px",
    margin: "6px auto",
  },

  col: {
    display: "flex",
    border: "1px solid #ccc",
    padding: "1px",
    fontSize: "60px",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
  },

  button: {
    width: "280px",
    height: "90px auto",
    fontSize: "24px",
  },
  root: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    margin: "2px auto",
    width: "35%",
  },
});

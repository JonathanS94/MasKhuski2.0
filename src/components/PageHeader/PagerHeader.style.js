import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  h1: {
    fontSize: "48px",
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "28px",
    fontFamily: "Poppins",
  },
  button: {
    width: "80%",
    height: "20%",
    fontSize: "40px",
    marginTop: "20px",
  },
  input: {
    width: "100%",
    height: "100px",
    fontSize: "30px",
    marginTop: "20px",
    marginLeft: "52px",
    marginRight: "52px",
  },
  container: {
    alignItems: "center",
    display: "flex",
  },
});

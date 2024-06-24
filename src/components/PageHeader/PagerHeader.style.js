import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  h1: {
    fontSize: "40px",
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "28px",
    fontFamily: "Poppins",
  },
  button: {
    width: "70%",
    height: "100px",
    fontSize: "40px",
    marginTop: "20px",
    marginBottom: "40px",
    padding: "20px",
  },
  input: {
    width: "100%",
    height: "80px",
    fontSize: "30px",
    backgroundColor: "#f8f9fa",
    color: "#000",
    borderColor: "#80bdff",
    outline: "none",
    marginTop: "20px",
    marginLeft: "52px",
    marginRight: "52px",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "20px",
  },
  img: {
    width: "500px",
  },
});

import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "20px",
  },
  h1: {
    fontSize: "40px",
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "28px",
    fontFamily: "Poppins",
  },

  img: {
    width: "500px",
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
    "&:focus": {
      backgroundColor: "#ffffff",
      color: "#000",
    },
    "&:active": {
      backgroundColor: "#ffffff",
      color: "#000",
    },
  },
  button: {
    width: "70%",
    height: "100px",
    fontSize: "40px",
    marginTop: "20px",
    marginBottom: "40px",
    padding: "20px",
  },

  progress: {
    width: "100%",
    marginTop: "20px",
    marginLeft: "52px",
    marginRight: "52px",
  },
});

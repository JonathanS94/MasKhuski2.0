import { createUseStyles } from "react-jss";
export const useStyles = createUseStyles({
  h1: {
    fontSize: "44px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "16px",
  },
  img: {
    width: "400px",
    marginTop: "20px",
  },
  score: {
    fontSize: "50px",
    fontFamily: "Poppins",
    color: "white",
    margin: "20px",
    paddingTop: "150px",
  },
  button: {
    width: "100%",
    fontSize: "30px",
    margin: "20px auto",
    padding: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "60px",
  },
});

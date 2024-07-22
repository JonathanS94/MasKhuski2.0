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
    paddingTop: "100px",
  },
  score: {
    fontSize: "50px",
    fontFamily: "Poppins",
    color: "white",
    textAlign: "center",
    margin: "20px 0",
    paddingTop: "150px",
  },
  button: {
    width: "80%",
    height: "120px auto",
    fontSize: "30px",
    margin: "20px auto",
    padding: "20px",
  },
  container: {
    display: "flex",
    marginTop: "10px",
    marginBottom: "40px",
  },
});

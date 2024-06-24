import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  h2: {
    fontSize: "36px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: "80%",
    height: "120px",
    fontSize: "30px",
    margin: "8px",
    padding: "10px",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "40px",
    marginBottom: "40px",
    padding: "20px",
  },
  img: {
    width: "500px",
  },
});

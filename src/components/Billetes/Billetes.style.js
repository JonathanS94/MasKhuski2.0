import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
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
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    height: "128px auto",
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  img: {
    width: "75%",
    padding: "0 auto",
  },
});

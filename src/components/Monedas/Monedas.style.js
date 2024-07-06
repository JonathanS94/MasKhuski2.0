import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  table: {
    maxWidth: "80%",
    marginTop: "24px",
    margin: "6px auto",
    borderCollapse: "collapse",
  },
  row: {
    display: "flex",
    border: "1px solid #ccc",
  },
  col: {
    display: "flex",
    border: "1px solid #ccc",
  },
  img: {
    margin: "2px auto",
    width: "35%",
  },
});

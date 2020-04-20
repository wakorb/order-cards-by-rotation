import React from "react";
import { makeStyles } from "@material-ui/styles";
import RootRouter from "./components/RootRouter";

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RootRouter />
    </div>
  );
}

export default App;

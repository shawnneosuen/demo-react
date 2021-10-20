import { Container } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "pretty-format";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: "red",
    },
  })
);
const Index = () => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.root}></div>
    </Container>
  );
};

export default Index;

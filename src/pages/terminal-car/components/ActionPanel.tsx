/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 16:57:25
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 17:17:09
 */

import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "end",
    },
    button: {
      marginRight: theme.spacing(2),
      minWdith: 100,
    },
  })
);

const Index = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant={"contained"} color="primary" className={classes.button}>
        {" "}
        Confirm
      </Button>
      <Button variant={"contained"} color="primary" className={classes.button}>
        {" "}
        Edit
      </Button>
    </div>
  );
};

export default Index;

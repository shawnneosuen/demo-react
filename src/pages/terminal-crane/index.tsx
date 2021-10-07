/*
 * @Author: your name
 * @Date: 2021-10-06 12:58:52
 * @LastEditTime: 2021-10-08 02:27:50
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-crane/index.tsx
 */
import {
  Button,
  createStyles,
  createTheme,
  Grid,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDebounce } from "utils";
import MarkupTables from "./components/MarkupTables";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    topPanel: {
      flexGrow: 1,
    },
  })
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#3576CB",
    },
  },
});

const Index = () => {
  const classes = useStyle();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container className={classes.topPanel}>
          <Grid item xs={8}>
            {" "}
            <MarkupTables></MarkupTables>{" "}
          </Grid>
          <Grid item xs={3}>
            <ActionPanel />
          </Grid>
          <Grid item xs={1}>
            {" "}
            <DatePanel></DatePanel>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Index;

const DatePanel = () => {
  const [date, setDate] = useState<string>();
  const debounceParam = useDebounce(date, 1000);
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, [debounceParam]);

  return <div>{date}</div>;
};

const ActionPanel = () => {
  return (
    <div>
      <div>{"任务分类"}</div>
      <div style={{ flexGrow: 1 }}>
        {"操作"}
        <Button
          variant="contained"
          color={"primary"}
          size={"large"}
          style={{ margin: 2 }}
        >
          吊起完成
        </Button>
        <Button
          variant="contained"
          color={"primary"}
          size={"large"}
          style={{ margin: 2 }}
        >
          卸下完成
        </Button>
        <Button
          variant="contained"
          color={"primary"}
          size={"large"}
          style={{ margin: 2 }}
        >
          强起完成
        </Button>
        <Button
          variant="contained"
          color={"primary"}
          size={"large"}
          style={{ margin: 2 }}
        >
          强卸完成
        </Button>
      </div>
    </div>
  );
};

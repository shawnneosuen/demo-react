/*
 * @Author: your name
 * @Date: 2021-10-06 10:22:05
 * @LastEditTime: 2021-10-17 01:33:22
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-product/components/SearchPanel.tsx
 */
import { Box, Button, createTheme, TextField, Theme } from "@material-ui/core";
import { createStyles, makeStyles, ThemeProvider } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    SearchPanel: {
      display: "flex",
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

interface Props {
  onSetFilter?: any;
}

const Index = ({ onSetFilter }: Props) => {
  const classes = useStyles();
  return (
    <div style={{ marginBottom: 20 }}>
      <ThemeProvider theme={theme}>
        <Box className={classes.SearchPanel}>
          <Button size="small" variant="outlined" color="primary">
            刷新
          </Button>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="COIL"
            style={{ marginLeft: 10 }}
            onChange={onSetFilter}
          ></TextField>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Index;

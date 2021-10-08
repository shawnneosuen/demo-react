/*
 * @Author: your name
 * @Date: 2021-09-17 02:51:41
 * @LastEditTime: 2021-10-09 01:45:12
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/components/Header/index.tsx
 */
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStatusContext } from "../../context/BasePageStatus";

const Header = () => {
  const { drawerFlag, openCloseDialog } = useStatusContext();
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.header}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            openCloseDialog(drawerFlag).then((r) => console.log(r));
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography>太钢</Typography>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "black",
      zIndex: theme.zIndex.tooltip + 1,
    },
  })
);

export default Header;

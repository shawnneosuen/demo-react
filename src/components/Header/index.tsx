/*
 * @Author: your name
 * @Date: 2021-09-17 02:51:41
 * @LastEditTime: 2021-10-09 01:45:12
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/components/Header/index.tsx
 */
import React, { useEffect, useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStatusContext } from "../../context/BasePageStatus";
import { useDebounce } from "utils";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

const Header = () => {
  const { drawerFlag, openCloseDialog } = useStatusContext();
  const [time, setTime] = useState<string>();
  const debounceParam = useDebounce(time, 1000);

  const { message } = useStatusContext();

  useEffect(() => {
    setTime(new Date().toLocaleString());
  }, [debounceParam]);
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.header}>
      <Toolbar style={{ display: "flex" }}>
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
        <Typography
          variant={"h6"}
          style={{
            flexGrow: 1,
            backgroundColor: "white",
            marginLeft: 20,
            marginRight: 20,
            color: "black",
          }}
        >
          <Icon fontSize={"small"}>
            <NotificationsNoneIcon />
          </Icon>
          {message ? message.data : "暂无通知"}
        </Typography>

        <Typography>{time}</Typography>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      flexGrow: 1,
      backgroundColor: "black",
      zIndex: theme.zIndex.tooltip + 1,
    },
  })
);

export default Header;

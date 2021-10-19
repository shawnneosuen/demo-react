import React, { ReactNode, useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  Toolbar,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useStatusContext } from "../../context/BasePageStatus";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@material-ui/icons/Inbox";
import NavigaterLink from "../NavigaterLink";
import { emitter, Events } from "boot/emitter";

const drawerWidth = 400;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerPaper: {
      width: drawerWidth,
      padding: 30,
    },
    drawerContainer: {
      overflow: "auto",
      height: "85%",
    },
    title: {},
  })
);

export interface BaseEditDrawContentProps {
  open?: boolean | undefined;
  onOpen?: any;
  title?: string | undefined;
  children?: ReactNode;
  onConfirm?: any;
  onCancel?: any;
}
const BaseDrawer = ({
  open,
  onOpen: handleOpen = () => {},
  title,
  children,
  onConfirm: handleConfirm = () => {},
  onCancel: handleCancel = () => {},
}: BaseEditDrawContentProps) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      open={open}
      variant="persistent"
      anchor={"right"}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Typography component={"h4"} className={classes.title}>
        {title}
      </Typography>

      <div className={classes.drawerContainer}>{children}</div>
      <Grid container style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => {
            handleOpen(!open);
            handleConfirm();
          }}
        >
          {" "}
          确认
        </Button>
        <Button
          variant={"outlined"}
          style={{ color: "grey", marginLeft: 5 }}
          onClick={() => {
            handleOpen(!open);
            handleCancel();
          }}
        >
          {" "}
          取消
        </Button>
      </Grid>
    </Drawer>
  );
};

export default BaseDrawer;

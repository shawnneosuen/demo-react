import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Label, Lock } from "@material-ui/icons";
import CommandButton from "components/CommandButton";

import ContextMenu from "components/ContextMenu";
import { Command } from "components/ContextMenu/models";
import { setContextMenu } from "context/Action";
import { useStatusContext } from "context/BasePageStatus";
import { ContextModel } from "context/model";
import React, {
  MenuHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Props {
  className?: string | "yard" | "zone" | undefined;
  width?: number;
  height?: number;
  px?: number;
  py?: number;
  top?: number;
  left?: number;
  label?: string;
  locked?: boolean;
  horizontal?: boolean;
  callStyles?: {
    border?: string;
    textAlign?: string;
    paddingTop?: string;
  };
  clickable?: boolean;
  children?: ReactNode;
  showContextMenu?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    yard: {
      position: "relative",
      backgroundColor: "#f0f0f0",
    },
    zone: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      flex: "center",
      justifyContent: "center",
      borderRadius: "3px",
      cursor: "default",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#C6C6C6",
      },
      border: "1px solid #505050",
      // writingMode:''
    },
    zoneLabel: {
      wordBreak: "break-all",
      fontSize: "11px",
    },
  })
);

const Index = ({
  className,
  width,
  height,
  px,
  py,
  top,
  left,
  label,
  locked,
  horizontal,
  callStyles,
  clickable,
  children,
  showContextMenu = false,
}: Props) => {
  const classes = useStyles();

  const thisStyles = {
    height: height && py ? height * py + "px" : "100%",
    width: width && px ? width * px + "px" : "100%",
    left: left && px ? left * px + "px" : 0,
    top: top && py ? top * py + "px" : 0,
    border: callStyles?.border,
    paddingTop: callStyles?.paddingTop,
  };
  //   const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const {
    anchorPoint,
    setArchorPointStatus,
    contextMenuStatus,
    setContextMenuStatus,
    contextMenuCommands,
    setContextMenuCommands,
  } = useStatusContext();

  const openDetailPage: Command = {
    Id: "Detial",
    Name: "区域详细",
    action: () => {},
  };

  const onContextMenu = (event: {
    preventDefault: () => void;
    pageX: number;
    pageY: number;
  }) => {
    event.preventDefault();
    setArchorPointStatus({ x: event.pageX, y: event.pageY });
    setContextMenuStatus(true);
    setContextMenuCommands([openDetailPage]);
  };
  return (
    <div
      className={className === "zone" ? classes.zone : classes.yard}
      style={thisStyles}
      onClick={() => {
        if (!clickable) {
          return;
        }
      }}
      onContextMenu={onContextMenu}
    >
      {locked ? <Lock color={"disabled"} fontSize={"small"}></Lock> : ""}

      {label ? (
        <Typography
          className={classes.zoneLabel}
          align={"center"}
          display={"block"}
          style={horizontal == false ? { width: "1px" } : {}}
        >
          {label}
        </Typography>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default Index;

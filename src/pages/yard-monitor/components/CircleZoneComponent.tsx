import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import React, { ReactNode } from "react";

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
  isUpperLeftCircle?: boolean;
  isUpperRightCircle?: boolean;
  isBottomLeftCircle?: boolean;
  isBottomRightCircle?: boolean;
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

    semiCircle: {
      borderRadius: "100px 100px 0 0",
      height: "50px",
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
  isUpperLeftCircle,
  isUpperRightCircle,
  isBottomLeftCircle,
  isBottomRightCircle,
}: Props) => {
  const classes = useStyles();
  const thisStyles = {
    height: height && py ? height * py + "px" : "100%",
    width: width && px ? width * px + "px" : "100%",
    left: left && px ? left * px + "px" : 0,
    top: top && py ? top * py + "px" : 0,
    border: callStyles?.border,
    paddingTop: callStyles?.paddingTop,
    borderTopLeftRadius: isUpperLeftCircle ? "100%" : "",
    borderTopRightRadius: isUpperRightCircle ? "100%" : "",
    borderBottomLeftRadius: isBottomLeftCircle ? "100%" : "",
    borderBottomRightRadius: isBottomRightCircle ? "100%" : "",
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
    >
      {locked ? <Lock color={"disabled"} fontSize={"small"}></Lock> : ""}

      {label ? (
        <Typography
          className={classes.zoneLabel}
          align={"center"}
          display={"block"}
          style={horizontal === false ? { width: "1px" } : {}}
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

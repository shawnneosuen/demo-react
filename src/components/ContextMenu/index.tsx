/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-30 02:07:01
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-08 01:10:02
 */

import { Button, Theme } from "@material-ui/core";
import React from "react";

import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { Command } from "./models";
import CommandButton from "components/CommandButton";
import { useStatusContext } from "context/BasePageStatus";
import { createStyles, makeStyles } from "@material-ui/styles";
interface Props {
  CommandButtons?: Command[];
  show?: boolean;
  x?: number;
  y?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ContextMenu: {
      zIndex: 1001,
      "& div": {
        zIndex: 1002,
      },
    },
  })
);
const Index = ({ CommandButtons, show, x, y }: Props) => {
  const classes = useStyles();
  const {
    anchorPoint,
    setArchorPointStatus,
    contextMenuStatus,
    setContextMenuStatus,
  } = useStatusContext();
  const handleClick = useCallback(
    () => (show ? setContextMenuStatus(false) : null),
    [show]
  );
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div>
      {show ? (
        <ul
          className={"menu"}
          style={{
            position: "absolute",
            top: anchorPoint?.y,
            left: anchorPoint?.x,
            zIndex: 1002,
          }}
        >
          <CommandButton name={"Share to.."} fullWidth={true}></CommandButton>
          <Button>Cut</Button>
          <Button>Copy</Button>
          <Button>Paste</Button>
          <hr className="divider" />
          <Button>Refresh</Button>
          <Button>Exit</Button>
        </ul>
      ) : (
        <> </>
      )}
    </div>
  );
};
export default Index;

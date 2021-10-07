/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-30 02:07:01
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-08 02:53:45
 */

import { Button, Theme, Typography } from "@material-ui/core";
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
    contextMenuCommands,
    setContextMenuCommands,
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
          {contextMenuCommands != null ? (
            contextMenuCommands.map((command: Command) => (
              <CommandButton
                name={command.Name}
                fullWidth={true}
                action={command.action}
                key={command.Id}
              ></CommandButton>
            ))
          ) : (
            <div style={{ flexGrow: 1 }}>
              <Typography> 未设置按钮</Typography>
            </div>
          )}
        </ul>
      ) : (
        <> </>
      )}
    </div>
  );
};
export default Index;

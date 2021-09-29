/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-30 02:07:01
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-09-30 02:41:23
 */

import { Button } from "@material-ui/core";
import React from "react";

import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { Command } from "./models";
import CommandButton from "components/CommandButton";
interface Props {
  CommandButtons: Command[];
}
const Index = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false); // hide menu

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return (
    <div>
      {show ? (
        <ul
          className="menu"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x,
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

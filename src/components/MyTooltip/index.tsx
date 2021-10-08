/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-09 01:08:05
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-09 01:19:14
 */

import { StyledProps, Tooltip } from "@material-ui/core";
import React, { CSSProperties, useEffect, useState } from "react";

interface Props {
  value?: string[];
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}
const Index = ({ value, left, top, width, height }: Props) => {
  const [thisStyle, setThisStyle] = useState<CSSProperties>();
  useEffect(() => {
    setThisStyle({
      height: height,
      width: width,
      left: left,
      top: top,
    });
  }, [value, left, top, width, height]);
  return (
    <div>
      <Tooltip title="add" arrow open style={thisStyle}>
        <div></div>
      </Tooltip>
    </div>
  );
};

export default Index;

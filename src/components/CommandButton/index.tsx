/*
 * @Description:复写默认Button按钮
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-30 02:24:20
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-08 01:23:13
 */

import { Button } from "@material-ui/core";
import React from "react";

interface Props {
  name?: string;
  label?: string;
  action?: Function;
  fullWidth?: boolean;
}

const Index = ({ name, label, action, fullWidth = true }: Props) => {
  return (
    <div>
      <Button fullWidth={fullWidth} onClick={() => action}>
        {name}
      </Button>
    </div>
  );
};
export default Index;

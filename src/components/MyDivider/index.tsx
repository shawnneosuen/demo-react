/*
 * @Author: your name
 * @Date: 2021-10-01 19:54:29
 * @LastEditTime: 2021-10-01 20:07:59
 * @LastEditors: Please set LastEditors
 * @Description: 分割线
 * @FilePath: /demo-react/src/components/MyDivider/index.tsx
 */
import React from "react";

interface Props {
  className?: "vertical" | "horizontal" | undefined;
  height?: string | number;
  width?: string | number;
  backgroundColor?: string;
}

const Index = ({ className, height, width, backgroundColor }: Props) => {
  const themeStyle = className ?? "horizontal";
  const verticalStyle = {
    height: height ?? "100%",
    width: width ?? 1,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: backgroundColor ?? "#B0B0B0",
  };
  const horizontalStyle = {
    height: height ?? 1,
    width: width ?? "100%",
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: backgroundColor ?? "#B0B0B0",
  };
  return (
    <div>
      <div
        style={themeStyle == "vertical" ? verticalStyle : horizontalStyle}
      ></div>
    </div>
  );
};

export default Index;

/*
 * @Author: your name
 * @Date: 2021-10-05 09:20:49
 * @LastEditTime: 2021-10-06 23:38:06
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/utils/index.tsx
 */

import React, { useEffect, useState } from "react";
const fs = require("fs");

// create a JSON object
const user = {
  id: 1,
  name: "John Doe",
  age: 22,
};

// convert JSON object to string
const data = JSON.stringify(user);

export const useDebounce = <V,>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const ReadJson = () => {};

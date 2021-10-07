/*
 * @Author: your name
 * @Date: 2021-10-05 09:20:49
 * @LastEditTime: 2021-10-08 02:41:23
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/utils/index.tsx
 */

import * as React from "react";
import { useEffect, useState } from "react";

export const useDebounce = <V,>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

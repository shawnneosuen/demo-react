/*
 * @Author: your name
 * @Date: 2021-10-11 14:37:08
 * @LastEditTime: 2021-10-26 15:45:23
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/components/MySelect/index.tsx
 */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Clear } from "@material-ui/icons";

interface Props extends MenuItemProps {
  value?: string;
  options?: string[];
  onChange?: any;
  init?: boolean;
  onClear?: any;
  label?: string;
  style?: any;
}

const Index = ({
  value = "",
  init,
  options,
  onChange: handleChange = () => {},
  onClear: handleClear,
  label,
  style,
}: Props) => {
  const [localValue, setLocalValue] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLDivElement>();

  const handleValue = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocalValue(event.target.value);
  };

  handleClear = () => {
    setAnchorEl(null);
    setLocalValue("");
  };

  useEffect(() => {
    handleChange(localValue);
  }, [localValue]);

  useEffect(() => {
    if (init) {
      setLocalValue("");
    }
  });
  return (
    <div style={style}>
      <InputLabel htmlFor={"MySelectInput"}>{label}</InputLabel>
      <OutlinedInput
        id="MySelectInput"
        ref={inputRef}
        label={label}
        value={localValue}
        onChange={handleValue}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              edge="start"
              color="inherit"
              size="small"
              onClick={handleClear}
            >
              <Clear />
            </IconButton>
          </InputAdornment>
        }
      ></OutlinedInput>
    </div>
  );
};
export default Index;

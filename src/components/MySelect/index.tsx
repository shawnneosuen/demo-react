/*
 * @Author: your name
 * @Date: 2021-10-11 14:37:08
 * @LastEditTime: 2021-10-26 15:29:55
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

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

interface Props extends MenuItemProps {
  value?: string;
  options?: string[];
  onSelect?: any;
  init?: boolean;
  onClear?: any;
  label?: string;
  style?: any;
}

const Index = ({
  value = "",
  init,
  options,
  onSelect: handleSelect = () => {},
  onClear: handleClear,
  label,
  style,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLDivElement>();
  const [itemWidth, setItemWidth] = useState<number>(0);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl == null) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleSelectClick = async (event: React.MouseEvent<HTMLElement>) => {
    setSelectedValue(event.currentTarget.innerText);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  handleClear = () => {
    setAnchorEl(null);
    setSelectedValue("");
  };

  useEffect(() => {
    setItemWidth((inputRef.current?.offsetWidth ?? 0) + 40);
  }, [inputRef.current]);

  useEffect(() => {
    handleSelect(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (init) {
      setSelectedValue("");
    }
  });
  return (
    <div style={style}>
      <InputLabel htmlFor={"MySelectInput"}>{label}</InputLabel>
      <OutlinedInput
        id="MySelectInput"
        ref={inputRef}
        label={label}
        value={selectedValue}
        onClick={handleClick}
        disabled
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
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        style={{ width: "100%" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options?.map((option: string) => (
          <MenuItem
            style={{ width: itemWidth }}
            key={option}
            onClick={handleSelectClick}
          >
            <div> {option}</div>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
export default Index;

/*
 * @Description:时间选择组件
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-26 13:38:58
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-26 14:38:51
 */

import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 230,
    },
  })
);

interface Props {
  label?: string;
  onConfirmed?: any;
  defaultValue?: string;
  variant?: "filled" | "outlined" | "standard" | undefined;
  size?: "medium" | "small" | undefined;
}

export default function DateAndTimePickers({
  label,
  onConfirmed: handleConfirmed = () => {},
  defaultValue = moment(new Date()).format("YYYY-MM-DDTHH:mm"),
  variant,
  size = "medium",
}: Props) {
  const classes = useStyles();
  console.log(defaultValue);

  const [value, setValue] = useState<string>();

  const handleChange = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    handleConfirmed(value);
  }, [value]);
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label={label}
        type="datetime-local"
        variant={variant}
        defaultValue={defaultValue}
        className={classes.textField}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

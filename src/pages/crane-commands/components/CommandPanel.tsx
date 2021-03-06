/*
 * @Author: your name
 * @Date: 2021-10-11 09:53:31
 * @LastEditTime: 2021-10-16 14:59:57
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/crane-commands/components/CommandPanel.tsx
 */

import {
  Button,
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hook";
import { commandCodes, CommandMapping } from "boot/utils/mapping";
import MyInputText from "components/MyInputText";
import MySelect from "components/MySelect";
import MyNativeSelect from "components/MySelect/MyNativeSelect";
import MyTitle from "components/MyTitle";
import { setDialogStatus } from "context/Action";
import { useStatusContext } from "context/BasePageStatus";

import React, { useEffect, useRef, useState } from "react";
import { FilterCondition } from "../context/model";
import { useTabelStatusContext } from "../context/TableStatus";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: theme.spacing(2),
    },
  })
);

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container style={{ border: "2px solid #F0F0F0" }} spacing={2}>
        <Grid item xs={3}>
          <MyTitle value={"指令颜色指示"}></MyTitle>
          <CommandExample></CommandExample>
        </Grid>
        <Grid item xs={5}>
          <MyTitle value={"指令筛选"}></MyTitle>
          <CommandFilter />
        </Grid>
        <Grid item xs={4}>
          <MyTitle value={"指令管理"}></MyTitle>
          <ManageCommands />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;

const useCommandPanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    item: {
      display: "flex",
    },
  })
);

// 指令颜色指示
const CommandExample = () => {
  const classes = useCommandPanelStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6} className={classes.item}>
          {" "}
          创建指令 <ColorSquare value="#5583b0" />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          {" "}
          作业指令 <ColorSquare value={"#98362f"} />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          {" "}
          获取指令 <ColorSquare value={"#4b8855"} />
        </Grid>
      </Grid>
    </div>
  );
};

interface ColorSqureProps {
  value?: string;
  width?: number;
  height?: number;
}
const ColorSquare = ({
  value = "red",
  width = 60,
  height = 30,
}: ColorSqureProps) => {
  return (
    <div style={{ backgroundColor: value, width: width, height: height }}></div>
  );
};

//  指令筛选
const CommandFilter = () => {
  const bayIds = useAppSelector((state) => state.yard).bayIds;
  const craneIds = useAppSelector((state) => state.yard).craneIds;
  const [selectBayId, setSelectBayId] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [inputCoilNo, setInputCoilNo] = useState<string>("");

  const ref = useRef(null);

  const { filter, setFilterConditon } = useTabelStatusContext();

  const changeHandle = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectBayId(event.target.value as string);
  };
  const commandsCodes: string[] = commandCodes;

  const onCoilNoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputCoilNo(event.target.value);
  };
  useEffect(() => {
    if (selectBayId) {
    } else {
      setSelectOptions(bayIds);
    }
  }, [selectBayId]);

  //   useEffect(() => {
  //     // console.log(ref.current)
  //     setFilterConditon(selected as any);
  //     console.log(selected);
  //   }, [selected]);

  const handleSelect =
    (
      field:
        | "ZoneFilter"
        | "WorkingTypeFilter"
        | "CraneNoFileter"
        | "BayNo"
        | "CommandTypeFilter"
        | "CoilNoFilter"
        | ""
    ) =>
    (selectedValue: string) => {
      if (filter && selectedValue) {
        let temp: FilterCondition = JSON.parse(JSON.stringify(filter));
        if (field === "ZoneFilter") {
          temp.ZoneFilter = selectedValue;
        }
        if (field === "WorkingTypeFilter") {
          temp.WorkingTypeFilter = selectedValue;
        }
        if (field === "CraneNoFileter") {
          temp.CraneNoFileter = selectedValue;
        }
        if (field === "BayNo") {
          temp.BayNo = selectedValue.toString();
        }
        if (field === "CommandTypeFilter") {
          temp.CommandTypeFilter = selectedValue;
        }
        setFilterConditon(temp);
      } else {
        setFilterConditon({
          BayNo: "",
          ZoneFilter: "",
          WorkingTypeFilter: "",
          CoilNoFilter: "",
          CommandTypeFilter: "",
          CraneNoFileter: "",
        });
      }
    };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <MySelect
            options={craneIds}
            onSelect={handleSelect("CraneNoFileter")}
            label={"行车号"}
          ></MySelect>
        </Grid>
        <Grid item xs={6}>
          <MySelect
            options={bayIds}
            onSelect={handleSelect("BayNo")}
            label={"跨号"}
          ></MySelect>
        </Grid>
      </Grid>
      {ref.current}
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <MySelect
            options={commandsCodes}
            onSelect={handleSelect("CommandTypeFilter")}
            label={"指令类型"}
          ></MySelect>
        </Grid>
        <Grid item xs={6}>
          <MyInputText label={"材料号"}> </MyInputText>
        </Grid>
      </Grid>
    </div>
  );
};

//  指令管理
const ManageCommands = () => {
  const [autoUpdateFlag, setAutoUpdateFlag] = useState<boolean>(true);
  const { dialogStatus, setDialogStatus } = useStatusContext();
  const {
    editDialogStatus,
    setEditDialogStatus,
    deleteDialogStatus,
    setDeleteDialogStatus,
  } = useStatusContext();

  const dispatch = useAppDispatch();
  return (
    <div>
      <Grid container direction="column">
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={autoUpdateFlag}
                onChange={() => setAutoUpdateFlag(!autoUpdateFlag)}
                name="checkAutoUpdate"
              />
            }
            label="自动更新"
          />
        </Grid>
        <Grid item spacing={3} container>
          <Grid item xs={6}>
            <Button
              variant={"outlined"}
              color="primary"
              onClick={() => {
                setEditDialogStatus(!!editDialogStatus);
              }}
            >
              <Typography style={{ fontSize: "20px" }}>编辑指令</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant={"outlined"} color="primary">
              <Typography style={{ fontSize: "20px" }}> 刷新指令 </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={"outlined"}
              color="primary"
              onClick={() => setDialogStatus(!!dialogStatus)}
            >
              <Typography style={{ fontSize: "20px" }}> 生成指令 </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={"outlined"}
              color="primary"
              onClick={() => setDeleteDialogStatus(!!deleteDialogStatus)}
            >
              <Typography style={{ fontSize: "20px" }}> 删除指令 </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-13 03:17:50
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-16 20:56:27
 */

import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hook";
import { Coil, Command } from "boot/model";
import MySelect from "components/MySelect";
import VirtualScrollSelect from "components/MySelect/VirtualScrollSelect";
import MyTitle from "components/MyTitle";
import { useStatusContext } from "context/BasePageStatus";
import React, { useEffect, useState } from "react";
import { addNewCommand } from "features/commands/commadSlice";
import { commandCodes, CommandMapping } from "boot/utils/mapping";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
  })
);

const Index = () => {
  const { dialogStatus, setDialogStatus } = useStatusContext();
  const bayIds = useAppSelector((state) => state.yard).bayIds;
  const craneIds = useAppSelector((state) => state.yard).craneIds;
  const coilNos = useAppSelector((state) => state.coils).coils.map(
    (coil: Coil) => coil.MAT_NO
  );
  const coils = useAppSelector((state) => state.coils).coils;
  const classes = useStyles();
  const commands = useAppSelector((state) => state.commands);
  const commandsCodes = commandCodes;
  const dispatch = useAppDispatch();

  // 初始化数据
  const [command, setCommand] = useState<Command>();
  const [commandNo, setCommandNo] = useState<string>(
    "" + Math.round(Math.random() * 1000000)
  );
  const [priority, setPriority] = useState<string>("");
  const [bayNo, setBayNo] = useState<string>("");
  const [craneNo, setCraneNo] = useState<string>("");
  const [coilNo, setCoilNo] = useState<string>("");
  const [status, setStatus] = useState<string>("0");
  const [commandType, setCommandType] = useState<string>("");
  const [fromStock, setFromStock] = useState<string>("");
  const [toStock, setToStock] = useState<string>("");
  const [pickupFlag, setPickupFlag] = useState<string>("是");

  const onHandleCommandNoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCommandNo(event.target.value);
  };

  const onHandlePriorityChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPriority(event.target.value);
  };

  const handleBayNoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBayNo(event.target.value);
  };

  const handleCraneNoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCraneNo(event.target.value);
  };

  const handleCoilNoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCoilNo(event.target.value);
  };

  const handleStatusChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(event.target.value);
  };

  const handleFromStockChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFromStock(event.target.value);
  };

  const handleToStockChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setToStock(event.target.value);
  };
  const handlePickupChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPickupFlag(event.target.value);
  };

  // const handleCommandTypeChange = (event: {
  // 	target: { value: React.SetStateAction<string> }
  // }) => {
  // 	setCommandType(event.targe.value)
  // }t
  const handleConfirm = () => {
    if (command) {
      dispatch(addNewCommand(command));
    }
    handleClose();
  };

  const handleClose = () => {
    setDialogStatus(dialogStatus);
  };

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(dialogStatus === true);
  }, [dialogStatus]);

  useEffect(() => {
    setCommandNo("" + Math.round(Math.random() * 1000000));
  }, [coilNo]);

  useEffect(() => {
    let commandTemp: Command = {
      CommandNo: commandNo,
      Priority: Number.parseInt(priority),
      BayNo: bayNo,
      CraneNo: craneNo,
      CoilNo: coilNo,
      CommandStatus: Number.parseInt(status),
      StartStock: fromStock,
      ToStock: toStock,
      PickupFlag: !!pickupFlag,
      UpdateTime: new Date().toLocaleString(),

      CommandType:
        commandCodes.find(
          (codeTemp: string) => CommandMapping(codeTemp) === commandType
        ) ?? "",
    };
    console.log(commandTemp);

    setCommand(commandTemp);
  }, [
    commandNo,
    priority,
    bayNo,
    craneNo,
    coilNo,
    status,
    fromStock,
    toStock,
    pickupFlag,
    commandType,
  ]);

  useEffect(() => {
    let coilTemp = coils.find((coil) => coil.MAT_NO === coilNo);
    setFromStock(coilTemp && coilTemp.ST_NO ? coilTemp.ST_NO : "");
  }, [coilNo]);
  return (
    <div>
      <Dialog open={open} maxWidth={"lg"}>
        <Paper style={{ width: "80vh" }} className={classes.root}>
          <MyTitle fontSize={20} value={"创建指令"}></MyTitle>
          <Grid
            container
            spacing={2}
            style={{ height: 500, width: "100%", marginTop: 2 }}
          >
            <Grid item xs={4}>
              {" "}
              <InputLabel>指令号</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={commandNo}
                disabled
                onChange={onHandleCommandNoChange}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <InputLabel>优先级</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={priority}
                type="number"
                onChange={onHandlePriorityChange}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <MySelect
                options={bayIds}
                onSelect={setBayNo}
                label="库区"
              ></MySelect>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <MySelect options={craneIds} onSelect={setCraneNo} label={"行车"}>
                {" "}
              </MySelect>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <InputLabel> 钢卷号</InputLabel>
              <VirtualScrollSelect
                options={coilNos}
                onSelect={setCoilNo}
              ></VirtualScrollSelect>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <MySelect
                options={commandCodes?.map((commandTemp: string) =>
                  CommandMapping(commandTemp)
                )}
                onSelect={setCommandType}
                label={"指令类型"}
              ></MySelect>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <InputLabel>起始库位</InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                value={fromStock}
                onChange={handleFromStockChange}
              ></TextField>
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              <InputLabel>卸下库位</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={toStock}
                onChange={handleToStockChange}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              {" "}
              <InputLabel>可吊起标志</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={pickupFlag}
                onChange={handlePickupChange}
              ></TextField>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleConfirm}>确定</Button>
            <Button onClick={handleClose}>取消</Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
};

export default Index;

/*
 * @Author: your name
 * @Date: 2021-10-06 12:58:52
 * @LastEditTime: 2021-10-18 20:43:39
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-crane/index.tsx
 */
import {
  Button,
  Chip,
  createStyles,
  createTheme,
  Grid,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hook";
import { Coil, Command } from "boot/model";
import React, { useEffect, useState } from "react";
import { useDebounce } from "utils";
import MarkupTables from "./components/MarkupTables";
import Table from "./components/Table";
import DoneIcon from "@material-ui/icons/Done";
import { commandCodes, CommandMapping } from "boot/utils/mapping";
import { TableProviders } from "./context";
import { useTabelStatusContext } from "./context/TableStatus";
import { FilterCondition } from "./context/model";
import { useDispatch } from "react-redux";
import { deleteCommand, updateCommand } from "features/commands/commadSlice";
import { updateCoil } from "features/coil/coilSlice";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    topPanel: {
      flexGrow: 1,
    },
    table: {
      marginTop: 10,
    },
    footPanel: {
      width: "100%",
    },
  })
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#3576CB",
    },
  },
});

const Index = () => {
  const classes = useStyle();
  const [selectedData, setSelectedData] = useState<Command[]>([]);
  return (
    <div className={classes.page}>
      <TableProviders>
        <ThemeProvider theme={theme}>
          <Grid container className={classes.topPanel} spacing={1}>
            <Grid item xs={8}>
              {" "}
              <MarkupTables></MarkupTables>{" "}
            </Grid>
            <Grid item xs={4}>
              <div style={{ height: "45%" }}>
                <ActionPanel />
              </div>
              <div className={classes.footPanel}>
                <FootPanel value={selectedData}></FootPanel>
              </div>
            </Grid>
          </Grid>
          <div className={classes.table}>
            <Table onSelected={setSelectedData}></Table>
          </div>
        </ThemeProvider>
      </TableProviders>
    </div>
  );
};

export default Index;

const DatePanel = () => {
  const [date, setDate] = useState<string>();
  const debounceParam = useDebounce(date, 1000);
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, [debounceParam]);

  return <div>{date}</div>;
};

const ActionPanel = () => {
  const commands = useAppSelector((state) => state.commands).commands;
  const [commandsType, setCommandsType] = useState<string[]>([]);
  const [selectedCommandType, setSelectedCommandTemp] = useState<string>("");
  const { filter, setFilterConditon } = useTabelStatusContext();

  const handleSelected = (name: string) => {
    setSelectedCommandTemp(name);
  };

  useEffect(() => {
    let allType = commands
      .filter((commandTemp: Command) => commandTemp.CommandType != "")
      .map((commandTemp: Command) => commandTemp.CommandType);
    let typesTemp: string[] = [];
    for (const type of allType) {
      if (!typesTemp.includes(type)) {
        typesTemp.push(type);
      }
    }
    setCommandsType(typesTemp);
  }, [commands]);
  useEffect(() => {
    console.log(selectedCommandType);
    let temp: FilterCondition = JSON.parse(JSON.stringify(filter));
    if (selectedCommandType && selectedCommandType != "") {
      //   temp.CommandTypeFilter = selectedCommand;
      setFilterConditon({
        BayNo: "",
        ZoneFilter: "",
        WorkingTypeFilter: "",
        CoilNoFilter: "",
        CommandTypeFilter:
          selectedCommandType === "全部" ? "" : selectedCommandType,
        CraneNoFileter: "",
      });
    }
  }, [selectedCommandType]);

  return (
    <div>
      <div>{"任务分类"}</div>
      <Chip
        label={"全部"}
        variant={"outlined"}
        onClick={() => handleSelected("全部")}
        deleteIcon={<DoneIcon />}
        color={
          selectedCommandType && selectedCommandType === "全部"
            ? "primary"
            : undefined
        }
      />
      {commandsType.map((name: string) => (
        <Chip
          label={CommandMapping(name)}
          variant={"outlined"}
          onClick={() => handleSelected(name)}
          deleteIcon={<DoneIcon />}
          key={name}
          color={
            selectedCommandType && selectedCommandType === name
              ? "primary"
              : undefined
          }
        />
      ))}
    </div>
  );
};

const useFootPanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      width: "100%",
    },
  })
);

interface FootPanelProps {
  value?: Command[];
}
const FootPanel = ({ value }: FootPanelProps) => {
  const commands = useAppSelector((state) => state.commands);
  const classes = useFootPanelStyles();
  const coils = useAppSelector((state) => state.coils);
  const [targetValue, setTargetValue] = useState<Coil>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (value && coils) {
      setTargetValue(
        coils.coils.find(
          (coilTemp: Coil) => coilTemp.MAT_NO === value[0]?.CoilNo
        )
      );
    }
  }, [value]);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color={"primary"}
            size={"large"}
            style={{ margin: 2 }}
            fullWidth
            disabled={
              commands.commands.findIndex(
                (command: Command) => command.CommandStatus === 1
              ) !== -1
            }
            onClick={() =>
              value
                ? dispatch(
                    updateCommand({
                      CommandNo: value[0].CommandNo,
                      CommandType:
                        commandCodes.find(
                          (code: string) =>
                            CommandMapping(code) === value[0].CommandType
                        ) ?? "",
                      Priority: value[0].Priority,
                      CraneNo: value[0].CraneNo,
                      StartStock: value[0].StartStock,
                      ToStock: value[0].ToStock,
                      CommandStatus: 1,
                      PickupFlag: value[0].PickupFlag,
                      CoilNo: value[0].CoilNo,
                      BayNo: value[0].BayNo,
                      UpdateTime: value[0].UpdateTime,
                    })
                  )
                : {}
            }
          >
            吊起完成
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color={"primary"}
            size={"large"}
            style={{ margin: 2 }}
            fullWidth
            disabled={
              commands.commands.findIndex(
                (command: Command) => command.CommandStatus === 1
              ) === -1
            }
            onClick={() =>
              value
                ? dispatch(
                    updateCommand({
                      CommandNo: value[0].CommandNo,
                      CommandType: value[0].CommandType,
                      Priority: value[0].Priority,
                      CraneNo: value[0].CraneNo,
                      StartStock: value[0].StartStock,
                      ToStock: value[0].ToStock,
                      CommandStatus: 100,
                      PickupFlag: value[0].PickupFlag,
                      CoilNo: value[0].CoilNo,
                      BayNo: value[0].BayNo,
                      UpdateTime: value[0].UpdateTime,
                    })
                  ) &&
                  dispatch(
                    deleteCommand({
                      CommandNo: value[0].CommandNo,
                      CommandType: value[0].CommandType,
                      Priority: value[0].Priority,
                      CraneNo: value[0].CraneNo,
                      StartStock: value[0].StartStock,
                      ToStock: value[0].ToStock,
                      CommandStatus: 100,
                      PickupFlag: value[0].PickupFlag,
                      CoilNo: value[0].CoilNo,
                      BayNo: value[0].BayNo,
                      UpdateTime: value[0].UpdateTime,
                    })
                  ) &&
                  (targetValue
                    ? dispatch(
                        updateCoil(
                          createCoilData(targetValue, "st_no", value[0].ToStock)
                        )
                      )
                    : "")
                : {}
            }
          >
            卸下完成
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color={"secondary"}
            size={"large"}
            fullWidth
            style={{ margin: 2 }}
          >
            强起完成
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            size={"large"}
            color={"secondary"}
            fullWidth
            style={{ margin: 2 }}
          >
            强卸完成
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const createCoilData = (coil: Coil, key: string, value: any) => {
  let coilTemp: Coil = JSON.parse(JSON.stringify(coil));

  if (coil) {
    switch (key) {
      case "st_no":
        coilTemp.ST_NO = value;
        break;
      default:
        coilTemp.ST_NO = "";
    }
  }
  return coilTemp;
};

/*
 * @Author: your name
 * @Date: 2021-10-06 12:58:52
 * @LastEditTime: 2021-10-16 21:01:52
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
import { Command } from "boot/model";
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
      height: "50%",
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
          <Grid container className={classes.topPanel}>
            <Grid item xs={8}>
              {" "}
              <MarkupTables></MarkupTables>{" "}
            </Grid>
            <Grid item xs={3}>
              <ActionPanel />
            </Grid>
            <Grid item xs={1}>
              {" "}
              <DatePanel></DatePanel>
            </Grid>
          </Grid>
          <div className={classes.table}>
            <Table onSelected={setSelectedData}></Table>
          </div>
          <div className={classes.footPanel}>
            <FootPanel value={selectedData}></FootPanel>
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
    setCommandsType(
      commands
        .filter((commandTemp: Command) => commandTemp.CommandType != "")
        .map((commandTemp: Command) => commandTemp.CommandType)
    );
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
      display: "flex",
      flexGrow: 1,
      justifyContent: "right",
      alignItems: "right",
    },
  })
);

interface FootPanelProps {
  value?: Command[];
}
const FootPanel = ({ value }: FootPanelProps) => {
  const commands = useAppSelector((state) => state.commands);
  const classes = useFootPanelStyles();
  const dispatch = useAppDispatch();
  return (
    <div className={classes.root} style={{ flexGrow: 1 }}>
      <Button
        variant="contained"
        color={"primary"}
        size={"large"}
        style={{ margin: 2 }}
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
      <Button
        variant="contained"
        color={"primary"}
        size={"large"}
        style={{ margin: 2 }}
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
              )
            : {}
        }
      >
        卸下完成
      </Button>
      <Button
        variant="contained"
        color={"primary"}
        size={"large"}
        style={{ margin: 2 }}
      >
        强起完成
      </Button>
      <Button
        variant="contained"
        color={"primary"}
        size={"large"}
        style={{ margin: 2 }}
      >
        强卸完成
      </Button>
    </div>
  );
};

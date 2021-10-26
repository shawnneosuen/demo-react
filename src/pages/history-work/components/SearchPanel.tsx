/*
 * @Author: your name
 * @Date: 2021-10-06 10:22:05
 * @LastEditTime: 2021-10-26 16:50:18
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/terminal-product/components/SearchPanel.tsx
 */
import {
  Box,
  Button,
  createTheme,
  Grid,
  TextField,
  Theme,
} from "@material-ui/core";
import { createStyles, makeStyles, ThemeProvider } from "@material-ui/styles";
import { useAppSelector } from "app/hook";
import { commandCodes, CommandMapping } from "boot/utils/mapping";
import MyDateComponent from "components/MyDateComponent";
import MyDivider from "components/MyDivider";
import MyInputText from "components/MyInputText";
import MySelect from "components/MySelect";
import MyTitle from "components/MyTitle";
import { setFilterConditon } from "pages/crane-commands/context/Action";
import React, { useEffect, useState } from "react";
import { FilterCondition } from "./Setup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    SearchPanel: {
      display: "flex",
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

interface Props {
  onSetFilter?: any;
  disabled?: boolean;
  onEditAction?: any;
}

const Index = ({
  onSetFilter: handleFitler = () => {},
  disabled,
  onEditAction: handleAction = () => {},
}: Props) => {
  const classes = useStyles();

  const [value, setValue] = useState<FilterCondition>();

  const [coilNo, setCoilNo] = useState<string>("");
  const craneIds = useAppSelector((state) => state.yard).craneIds;

  const [craneNo, setCraneNo] = useState<string>();
  const [commandType, setCommandType] = useState<string>();

  useEffect(() => {
    let filterCondition: FilterCondition = {
      craneNo: craneNo ?? "",
      commandCode: commandType ?? "",
      coilNo: coilNo ?? "",
    };
    setValue(filterCondition);
  }, [coilNo, craneNo, commandType]);

  useEffect(() => {
    handleFitler(value);
  }, [value]);
  return (
    <div style={{ marginBottom: 20 }}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          {/* 时间排序 */}
          <Grid item xs={3} style={{ border: "1px dashed lightgrey" }}>
            <MyTitle value={"时间筛选"}></MyTitle>
            <MyDateComponent label={"开始时间"} />
            <MyDateComponent label={"结束时间"} />
          </Grid>

          {/* 类型筛选 */}
          <Grid item xs={9} style={{ border: "1px dashed lightgrey" }}>
            <Box>
              <MyTitle value={"类型筛选"} />
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <MySelect
                    label={"行车"}
                    options={craneIds}
                    onSelect={setCraneNo}
                  ></MySelect>
                </Grid>
                <Grid item xs={3}>
                  <MySelect
                    label={"操作类型"}
                    options={commandCodes.map((codeTemp) =>
                      CommandMapping(codeTemp)
                    )}
                    onSelect={setCommandType}
                  />
                </Grid>
                <Grid item xs={7}>
                  <MyInputText
                    label={"钢卷号"}
                    onChange={setCoilNo}
                  ></MyInputText>
                </Grid>
              </Grid>
            </Box>
            <Button
              variant={"contained"}
              style={{ marginTop: 5 }}
              color={"primary"}
            >
              {" "}
              导出
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Index;

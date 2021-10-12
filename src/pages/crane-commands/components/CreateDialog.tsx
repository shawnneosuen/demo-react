/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-13 03:17:50
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-13 03:42:52
 */

import { Dialog, DialogProps, Grid, Paper, TextField } from "@material-ui/core";
import { Command } from "boot/model";
import React, { useState } from "react";

interface Props extends DialogProps {}

const Index = ({ open }: Props) => {
  const [command, setCommand] = useState<Command>();
  return (
    <div>
      <Dialog open={open} maxWidth={"lg"}>
        <Paper style={{ height: 500, width: "80vh" }}>
          <Grid container spacing={2} style={{ height: 500, width: "100%" }}>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="指令号"></TextField>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="优先级"></TextField>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="跨号"></TextField>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="行车号"></TextField>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="材料号"></TextField>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="指令状态"></TextField>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="起始库位"></TextField>
            </Grid>{" "}
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="卸下库位"></TextField>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <TextField variant="outlined" label="可吊起标志"></TextField>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </div>
  );
};

export default Index;

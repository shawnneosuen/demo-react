/*
 * @Author: your name
 * @Date: 2021-10-11 09:51:48
 * @LastEditTime: 2021-10-14 11:02:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/pages/crane-commands/index.tsx
 */

import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import CommandPanel from "./components/CommandPanel";
import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import EmergencyButton from "./components/EmergencyButton";
import { TableProviders } from "./context";
import CreateDialog from "./components/CreateDialog";
import EditDialog from "./components/EditeDialg";
import { useTabelStatusContext } from "./context/TableStatus";
import { Command } from "boot/model";
import DeleteDialog from "./components/DeleteDialog";
import MyNativeSelect from "components/MySelect/MyNativeSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    page: {
      padding: theme.spacing(2),
    },
    commandPanel: {
      width: "100%",
      height: "30%",
    },
    tablePanel: {
      borderTop: "1px solid #E0E0E0",
      padding: theme.spacing(2),
    },
    emergencyPanel: {
      display: "flex",
      justifyContent: "right",
    },
  })
);

const Index = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Command[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);
  return (
    <div className={classes.root}>
      <Paper className={classes.page}>
        <TableProviders>
          {/* <div className={classes.commandPanel}> */}
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <CommandPanel></CommandPanel>
            </Grid>
            {/* </div> */}
            <Grid item>
              <Table onSelected={setSelectedData}></Table>
            </Grid>
          </Grid>

          <CreateDialog></CreateDialog>
          <EditDialog selectedData={selectedData}></EditDialog>
          <DeleteDialog selectedData={selectedData}></DeleteDialog>
        </TableProviders>
      </Paper>
    </div>
  );
};

export default Index;

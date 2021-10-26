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
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import MyDivider from "components/MyDivider";

import MyTitle from "components/MyTitle";
import { useStatusContext } from "context/BasePageStatus";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
  })
);

const Index = () => {
  // Initial Data
  const { dialogModel, handleDialogModel } = useStatusContext();

  const classes = useStyles();
  const title = "cofirm-product-dialog";

  // Methods
  const handleClose = () => {
    handleDialogModel(undefined);
  };

  const handleConfirm = () => {
    if (dialogModel && dialogModel.actions) {
      dialogModel?.actions[0]();
    }

    handleClose();
  };
  const handleCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={
          !!dialogModel
            ? !!dialogModel.open && dialogModel.title === title
            : false
        }
        maxWidth={"lg"}
      >
        <Paper style={{ width: "80vh" }} className={classes.root}>
          <MyTitle fontSize={20} value={dialogModel?.header}></MyTitle>
          <MyDivider className={"horizontal"} />
          <Typography>{dialogModel?.msg}</Typography>
          <DialogActions>
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={handleConfirm}
            >
              确定
            </Button>
            <Button variant={"outlined"} onClick={handleCancel}>
              取消
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
};

export default Index;

/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-08 01:36:26
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-08 02:18:18
 */
import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { useStatusContext } from "context/BasePageStatus";
import { useDebounce } from "utils";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface State extends SnackbarOrigin {
  open: boolean;
}

const Index = () => {
  const [state, setState] = useState({
    open: false,
  });
  const { open } = state;
  const { snackbar, setSnackbar } = useStatusContext();

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const debounceParam = useDebounce(snackbar, 3000);

  useEffect(() => {
    if (snackbar) {
      setState({ open: true });
    }
  }, [snackbar]);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity={snackbar?.type}>
          {snackbar?.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Index;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

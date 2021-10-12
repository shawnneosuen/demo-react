/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-13 03:03:09
 */
import { Command } from "components/ContextMenu/models";
import React, { ReactNode, useState } from "react";
import * as action from "./Action";
import { AnchorPointModel, ContextModel, SnackbarModel } from "./model";

const StatusContext = React.createContext<
  | {
      drawerFlag: boolean | null;
      openCloseDialog: (drawerFlag: boolean | null) => Promise<void>;
      getStatus: (drawerFlag: boolean) => Promise<boolean>;
      contextMenuStatus: boolean | undefined;
      setContextMenuStatus: (
        showContextMenu: boolean | undefined
      ) => Promise<void>;
      getContextMenuStatus: (showContextMenu: boolean) => Promise<boolean>;
      anchorPoint: AnchorPointModel | null;
      setArchorPointStatus: (
        anchorPoint: AnchorPointModel | null
      ) => Promise<void>;
      getArchorPointStatus: (
        anchorPoint: AnchorPointModel
      ) => Promise<AnchorPointModel>;
      contextMenuCommands: Command[] | null;
      setContextMenuCommands: (anchorPoint: Command[] | null) => Promise<void>;
      getContextMenuCommands: (anchorPoint: Command[]) => Promise<Command[]>;
      snackbar: SnackbarModel | null;
      setSnackbar: (snackBar: SnackbarModel | null) => Promise<void>;
      getSnackbar: (snackBar: SnackbarModel) => Promise<SnackbarModel>;
    }
  | undefined
>(undefined);
StatusContext.displayName = "StatusContext";

export const BaseStatusProvider = ({ children }: { children: ReactNode }) => {
  const [drawerFlag, setDrawerFlag] = useState<boolean | null>(null);

  const openCloseDialog = (drawerFlag: boolean | null) =>
    action.openCloseDialog(drawerFlag).then(setDrawerFlag);
  const getStatus = (drawerFlag: boolean) => action.getStatus(drawerFlag);

  const [contextMenuStatus, setContextMenuModelStatus] = useState<
    boolean | undefined
  >(undefined);
  const setContextMenuStatus = (contextMenuStatus: boolean | undefined) =>
    action.setContextMenu(contextMenuStatus).then(setContextMenuModelStatus);
  const getContextMenuStatus = (contextMenuStatus: boolean) =>
    action.getContextMenu(contextMenuStatus);

  const [anchorPoint, setAnchorPoint] = useState<AnchorPointModel | null>(null);
  const setArchorPointStatus = (anchorPoint: AnchorPointModel | null) =>
    action.setArchorPointStatus(anchorPoint).then(setAnchorPoint);
  const getArchorPointStatus = (anchorPoint: AnchorPointModel) =>
    action.getArchorPointStatus(anchorPoint);

  const [contextMenuCommands, setContextMenuCommandsModel] = useState<
    Command[] | null
  >(null);
  const setContextMenuCommands = (contextMenuCommands: Command[] | null) =>
    action
      .setContextMenuCommands(contextMenuCommands)
      .then(setContextMenuCommandsModel);
  const getContextMenuCommands = (contextMenuCommands: Command[]) =>
    action.getContextMenuCommands(contextMenuCommands);

  const [snackbar, setSnackBarModel] = useState<SnackbarModel | null>(null);
  const setSnackbar = (snackbar: SnackbarModel | null) =>
    action.setSnackbar(snackbar).then(setSnackBarModel);
  const getSnackbar = (snackbar: SnackbarModel) => action.getSnackbar(snackbar);

  const value = {
    drawerFlag,
    openCloseDialog,
    getStatus,
    contextMenuStatus,
    setContextMenuStatus,
    getContextMenuStatus,
    anchorPoint,
    setArchorPointStatus,
    getArchorPointStatus,
    contextMenuCommands,
    setContextMenuCommands,
    getContextMenuCommands,
    snackbar,
    setSnackbar,
    getSnackbar,
  };
  return <StatusContext.Provider children={children} value={value} />;
};

export const useStatusContext = () => {
  const context = React.useContext(StatusContext);
  if (!context) {
    throw new Error("useStatusContext Error! ");
  }
  return context;
};

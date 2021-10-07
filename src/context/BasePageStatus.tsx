import React, { ReactNode, useState } from "react";
import * as action from "./Action";
import { AnchorPointModel, ContextModel } from "./model";

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

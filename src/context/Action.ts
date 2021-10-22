/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-13 03:13:07
 */
import { Command } from "components/ContextMenu/models"
import { AnchorPointModel, ContextModel, DialogModelProps, SnackbarModel } from "./model"

export const openCloseDialog = async(data: boolean | null) => {
    return !data
}

export const getStatus = async (data: boolean) => {
    return data
}

export const setContextMenu = async(data: boolean | undefined) => {
    return !!data
}
export const getContextMenu = async(data: boolean) => {
    return data
}

export const setArchorPointStatus = async(data: AnchorPointModel | null) => {
    return data
}
export const getArchorPointStatus = async(data: AnchorPointModel) => {
    return data
}

export const setContextMenuCommands = async(data: Command[] | null) => {
    return data
}
export const getContextMenuCommands = async(data: Command[]) => {
    return data
}

export const setSnackbar = async(data: SnackbarModel | null) => {
    return data
}
export const getSnackbar = async(data: SnackbarModel) => {
    return data
}

export const setDialogStatus = async(data: boolean | null) => {
    return !data
}

export const setDialog = async(data: DialogModelProps | undefined) => {
    return data
}

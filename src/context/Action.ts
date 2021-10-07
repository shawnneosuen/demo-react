import { AnchorPointModel, ContextModel } from "./model"

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
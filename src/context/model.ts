/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-07 19:42:43
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-08 02:16:43
 */


export interface ContextModel{
    open: boolean,
    x: number,
    y: number,
    commandButtons: CommandButtonModel[]
}

export interface CommandButtonModel{
    name: string,
    action: Function
}
export interface AnchorPointModel{
    x:number,
    y:number
}

export interface SnackbarModel{
    type?: Color;
    msg?:string
}
export type Color = 'success' | 'info' | 'warning' | 'error';
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 17:20:25
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 20:31:04
 */

import { Command, TruckStowageDetailModel } from "boot/model";

export const CreateCommandData =(stowageItem: TruckStowageDetailModel | undefined, truckNo: string| undefined) => {
    if (!stowageItem) {
        console.error('输入车辆配载类型出错')
        return undefined
    }

    let command: Command;

    command = {
        CommandNo: Math.round(Math.random() * 1000000).toString(),
        CommandType: '1F',
        Priority:1,
        StartStock:truckNo ?? '',
        ToStock:'',
        CommandStatus:0,
        PickupFlag: true,
        CoilNo: stowageItem.COIL_NO,
        BayNo: 'NY',
        UpdateTime: new Date().toLocaleString(),
        CraneNo: '21'
    }

    return command


    

}
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-10-18 16:08:30
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-18 16:53:08
 */

import { TruckStowageDetailModel } from "boot/model";



export const TruckStowageDetials: TruckStowageDetailModel[] = [
    {
        ID: '1',
        STOWAGE_ID: '1',
        COIL_NO: '212235300600',
        STATUS:0,
        POSITION_ON_TRUCK: 1,
        ST_NO: 'PSD100',
        CREATE_TIME: '',
        UPDATE_TIME: ''
    },
    {
        ID: '2',
        STOWAGE_ID: '1',
        COIL_NO: '212084302101',
        STATUS:0,
        ST_NO: 'PSD102',
        POSITION_ON_TRUCK: 2,
        CREATE_TIME: '',
        UPDATE_TIME: ''
    },
    {
        ID: '3',
        STOWAGE_ID: '2',
        ST_NO: 'PSD103',
        COIL_NO: '212235304200',
        POSITION_ON_TRUCK: 1,
        STATUS:0,
        CREATE_TIME: '',
        UPDATE_TIME: ''
    },
    {
        ID: '4',
        STOWAGE_ID: '2',
        ST_NO: 'PSD104',
        COIL_NO: '212236004000',
        POSITION_ON_TRUCK: 2,
        STATUS:0,
        CREATE_TIME: '',
        UPDATE_TIME: ''
    }

]
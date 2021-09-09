export interface Yard{
    bayIds: string[],
    bays:Map<string, Bay>
}
export interface Bay {
    bayId: string,
    dimension: {
        width: number,
        height: number
    },
    parkings: Parking[],
    safetyZones: Zone[],
    cranes: Crane[],
    stockSaddles: StockSaddle[],
}
export interface Zone{
    id: string,
    label: string,
    left: number,
    top: number,
    width: number,
    height: number,
    lockStatus: number
}

export interface Parking {
    id: string,
    label: string,
    left: number,
    top: number,
    width: number,
    height: number,
    horizontal: boolean,
    locked: boolean,
}

export interface Crane {
    id: string,
    label: string,
    y: number,
    z: number,
    left: number,
    top: number,
    width: number,
    height: number,
    trolleyHeight: number,
    status: number,
    occupied: boolean,
    wmsMode: number,
    activityStatus: number,
    rotateAngleAct: number,
    pawActWidth: number,
    gantryTelemeter: number,
    trolleyTelemeter: number,
    rejectionReason: number,
    faultCode: number,
    tagProps: any[],
}

export interface StockSaddle{
     id: string, label: string, left: number, top: number, width: number, height: number 
}
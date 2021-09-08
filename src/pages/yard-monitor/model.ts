export interface Yard{
    bayIds: string[],
    bays: {}
}
export interface Bay {
    bayId: string,
    dimension: {
        width: number,
        height: number
    },
    parkings: Parking[],
    safetyZones: Zone[],
    cranes: Crane[]
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


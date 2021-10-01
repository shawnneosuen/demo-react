/*
 * @Description: 模型建立
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-01 22:19:43
 */
export interface Yard {
	bayIds: string[]
	bays: Map<string, Bay>
	craneIds: string[]
	cranes: Map<string, Crane>
}
export interface Bay {
	bayId: string
	dimension: {
		width: number
		height: number
	}
	bayAreas: BayArea[]
	craneIds: string[]
	parkings: Parking[]
	safetyZones: Zone[]
	circleZones: CircleZone[]
	cranes: Crane[]
	stockSaddles: StockSaddle[]
}
export interface Zone {
	id: string
	label: string
	left: number
	top: number
	width: number
	height: number
	lockStatus: number
}

export interface Parking {
	id: string
	label: string
	left: number
	top: number
	width: number
	height: number
	horizontal: boolean
	locked: boolean
}

export interface Crane {
	id: string
	label: string
	y: number
	z: number
	left: number
	top: number
	width: number
	height: number
	trolleyHeight: number
	status: number
	occupied: boolean
	wmsMode: number
	activityStatus: number
	rotateAngleAct: number
	pawActWidth: number
	gantryTelemeter: number
	trolleyTelemeter: number
	rejectionReason: number
	faultCode: number
	tagProps: any[]
}

export interface StockSaddle {
	id: string
	label: string
	left: number
	top: number
	width: number
	height: number
	static: boolean
}

export interface BayArea {
	id: string
	label: string
	left: number
	top: number
	width: number
	height: number
	lockStatus: number
}

export interface CircleZone {
	id: string
	label: string
	left: number
	top: number
	width: number
	height: number
	lockStatus: number
	upperLeftCircle: boolean
	upperRightCircle: boolean
	bottomLeftCircle: boolean
	bottomRightCircle: boolean
}

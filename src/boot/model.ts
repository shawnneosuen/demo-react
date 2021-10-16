/*
 * @Description: 模型建立
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-10-16 21:13:15
 */
export interface Yard {
	bayIds: string[]
	bays: Bay[]
	craneIds: string[]
	cranes: Crane[]
}
export type Bay = {
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
	equipmentStock: StockSaddle[]
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

export interface User {
	username: string
	password: string
	role: 'admin' | 'dev' | 'user' | 'stranger'
}

export interface Commands {
	commands: Command[]
}

export interface Command {
	CommandNo: string
	CommandType: string
	Priority: number
	CraneNo: string
	StartStock: string
	ToStock: string
	CommandStatus: number
	PickupFlag: boolean
	CoilNo: string
	BayNo: string
	UpdateTime: string
}

export interface Coil {
	ACT_WEIGHT: number | null
	ACT_WIDTH: number | null
	CODE_PILE: number | null
	COIL_OPEN_DIRECTION: number | null
	COIL_STATUS: number | null
	COIL_TARGET: string | null
	CONTRACT_NO: string | null
	CROSS_FLAG: boolean | null
	DEGREESORTING_FLAG: boolean | null
	DEPUTY_FLAG: string | null
	DOUBLE_STACK: string | null
	DUMMY_COIL_FLAG: boolean | null
	END_STATION: string | null
	FLAG_FORBIDDENED: string | null
	FLAG_INSULATION_COVER: string | null
	FLAG_SCRAP: string | null
	FLAG_SUSPECTABLE: string | null
	FLAG_TAIL: string | null
	INDIA: number | null
	INTENSITY: number | null
	INYARD_TIME: string | null
	MAT_NO: string
	MOTHER_MAT_NO: string | null
	NEXT_UNIT_NO: string | null
	OUTBUY_COIL_NO: string | null
	OUTDIA: number | null
	PACK_CODE: string | null
	PACK_FLAG: string | null
	POST_TREATMENT: string | null
	PROD_DATE: string | null
	READY_DATE: string | null
	REC_TIME: string | null
	REQ_TIME: string | null
	SCRAP_MAT_FLAG: string | null
	SG_SIGN: string | null
	SIGN_NO: string | null
	SLEEVE_WIDTH: number | null
	SOURCE: string | null
	STEEL_GRANDID: string | null
	ST_NO: string | null
	TEMP: string | null
	TEMPERATURE: number | null
	THICKNESS: string | null
	UPD_TIME: string | null
	VALIDITY_FLAG: boolean | null
	WEIGHT: number | null
	WIDTH: number | null
	WOODEN_FLAG: boolean | null
}

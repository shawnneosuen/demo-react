/*
 * @Description:主监控
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-08 20:26:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-01 17:32:44
 */
import { Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ZoneComponent from './components/ZoneComponent'
import { selectYard } from '../../store/yardSlice'
import { Crane, Parking, Zone, StockSaddle, CircleZone } from './model'
import CraneMap from './components/CraneMap'
import CircleZoneComponent from './components/CircleZoneComponent'

interface Props {
	bayId: string
	baseHeight: number
	baseWidth: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({}))

const Index = ({ bayId, baseHeight, baseWidth }: Props) => {
	const classes = useStyles()
	const bay = useSelector(selectYard).bays.get(bayId)
	const safetyZones = bay.safetyZones
	const circleZones = bay.circleZones
	const parkingZones = bay.parkings
	const stockSaddles = bay.stockSaddles
	const cranes = bay.cranes

	const [py, setPy] = useState<number>(0)
	const [px, setPx] = useState<number>(0)
	useEffect(() => {
		setPy(baseHeight / bay.dimension.height)
		setPx(baseWidth / bay.dimension.width)
	})
	return (
		<div>
			<ZoneComponent
				className={'Yard'}
				width={bay.dimension.width}
				height={bay.dimension.height}
				px={px}
				py={py}
			>
				{safetyZones.map((zone: Zone) => (
					<ZoneComponent
						key={zone.id}
						className={'zone'}
						width={zone.width}
						height={zone.height}
						px={px}
						py={py}
						left={zone.left}
						top={zone.top}
						clickable={true}
						label={zone.label}
					></ZoneComponent>
				))}
				{circleZones.map((circleZone: CircleZone) => (
					<CircleZoneComponent
						key={circleZone.id}
						className={'zone'}
						label={circleZone.label}
						left={circleZone.left}
						top={circleZone.top}
						width={circleZone.width}
						height={circleZone.height}
						px={px}
						py={py}
						// yardViewMode='yardViewMode'
						// packing='v.packing'
						// packingZoneId='v.packingZoneId'
						// borderlessTop='v.borderlessTop'
						// baseStyle='v.baseStyle'
						// lockStatus='v.lockStatus'
						// disableHover='v.disableHover'
						isUpperLeftCircle={circleZone.upperLeftCircle}
						isUpperRightCircle={circleZone.upperRightCircle}
						isBottomLeftCircle={circleZone.bottomLeftCircle}
						isBottomRightCircle={circleZone.bottomRightCircle}
					/>
				))}
				{parkingZones.map((parking: Parking) => (
					<ZoneComponent
						key={parking.id}
						className={'zone'}
						width={parking.width}
						height={parking.height}
						px={px}
						py={py}
						left={parking.left}
						top={parking.top}
						clickable={true}
						label={parking.label}
						locked={parking.locked}
						horizontal={parking.horizontal}
					></ZoneComponent>
				))}
				{/* {
                stockSaddles.map((stockSaddle: StockSaddle) => <ZoneComponent key={stockSaddle.id} className={'zone'} width={stockSaddle.width} height={stockSaddle.height} px={px} py={py} left={stockSaddle.left} top={stockSaddle.top} clickable={true} ></ZoneComponent>)
            } */}
				<CraneMap cranes={cranes} px={px} py={py} key={bayId}></CraneMap>
			</ZoneComponent>
		</div>
	)
}

export default Index

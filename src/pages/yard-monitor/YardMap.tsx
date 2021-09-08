import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import ZoneComponent from './components/ZoneComponent'
import { selectYard } from "./store/yardSlice";
import {Crane, Parking, Zone} from './model'
interface Props {
    bayId: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({

}))

const Index = ({bayId}: Props) => {
    const classes = useStyles()
    const bay = useSelector(selectYard).bays[bayId]
    const safetyZones = bay.safetyZones;
    const parkingZones = bay.parkings;
    const cranes = bay.cranes
    const baseHeight =  270;
    const baseWidth = 1780;
    const py =baseHeight /bay.dimension.height;
    const px =baseWidth /bay.dimension.width;
    return <div >
        <ZoneComponent className={'Yard'} width={bay.dimension.width} height={bay.dimension.height} px={px} py={py}>
            {
                safetyZones.map((zone:Zone) => <ZoneComponent key={zone.id} className={'zone'} width={zone.width} height={zone.height} px={px} py={py} left={zone.left} top={zone.top} clickable={true} label={zone.label}></ZoneComponent>)
            }
            {
                parkingZones.map((parking:Parking) => <ZoneComponent key={parking.id} className={'zone'} width={parking.width} height={parking.height} px={px} py={py} left={parking.left} top={parking.top} clickable={true} label={parking.label} locked={parking.locked} horizontal={parking.horizontal}></ZoneComponent>)
            }
            {
                cranes.map((crane: Crane) => <ZoneComponent key={crane.id} className={'zone'} width={crane.width} height={crane.height} px={px} py={py} left={crane.left} top={crane.top} clickable={true} label={crane.label} ></ZoneComponent>)
            }
        </ZoneComponent>
    </div>
}

export default Index
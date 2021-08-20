import React, { ReactNode, useState } from 'react'
import * as action from './Action'

const StatusContext = React.createContext<{drawerFlag: boolean|null,
    openCloseDialog:(drawerFlag:boolean | null) => Promise<void> ,
    getStatus:(drawerFlag:boolean) => Promise<boolean>}| undefined
    >(undefined)
StatusContext.displayName = 'StatusContext'

export const BaseStatusProvider = ({children}:{children: ReactNode}) => {
    const [drawerFlag, setDrawerFlag] = useState<boolean | null>(null)

    const openCloseDialog = (drawerFlag: boolean | null) => action.openCloseDialog(drawerFlag).then(setDrawerFlag)
    const getStatus =  (drawerFlag: boolean) => action.getStatus(drawerFlag)

    return <StatusContext.Provider children={children} value={{drawerFlag, openCloseDialog, getStatus}}/>
}

export const useStatusContext = () => {
    const context = React.useContext(StatusContext)
    if (!context){
        throw new Error('useStatusContext Error! ')
    }
    return context
}


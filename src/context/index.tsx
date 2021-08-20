import React, { ReactNode } from "react";
import  {BaseStatusProvider}  from "./BasePageStatus";

export const AppProviders = ({children}: {children: ReactNode}) => {
    return (<BaseStatusProvider>
        {children}
    </BaseStatusProvider>)
}
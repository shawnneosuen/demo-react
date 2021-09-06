import * as React from 'react'
import TerminalProduct from "../layouts/terminal-product";
import Home from "../pages/Home"
import ThreeDimension from "pages/three-dimension"
import Design from "pages/settings/design"

const Routers = () => {
    return [
        {
            path: "/",
            main: <Home/>
        },
        {
            path: "/terminal-product",
            main: <TerminalProduct/>
        },
        {
            path: '/three-dimension',
            main: < ThreeDimension/>
        },
        {
            path: "/setting/design",
            main: <Design/>
        }
    ]
}
export default Routers
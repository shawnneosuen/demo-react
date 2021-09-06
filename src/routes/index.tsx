import * as React from 'react'
import TerminalProduct from "../layouts/terminal-product";
import Home from "../pages/Home"
import ThreeDimension from "pages/three-dimension"
import Design from "pages/settings/design"
import YardMonitor from 'pages/yard-monitor'

const Routers = () => {
    return [
        {
            path: "/",
            main: <YardMonitor/>
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
/*
 * @Author: your name
 * @Date: 2021-08-23 13:20:23
 * @LastEditTime: 2021-10-26 10:58:02
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/routes/index.tsx
 */
import * as React from "react";
import TerminalProduct from "pages/terminal-product";
import YardMonitor from "pages/yard-monitor";
import WMSLogin from "pages/wms-login";
import TerminalCrane from "pages/terminal-crane";
import ZoneMonitor from "pages/zone-monitor";
import CraneCommands from "pages/crane-commands";
import EquipmentCommands from "pages/commands-equipment";
import TerminalCar from "pages/terminal-car";
import TestPage from "pages/test-page";
import HistoryWork from "pages/history-work";
const Routers = () => {
  return [
    {
      path: "/",
      main: <YardMonitor />,
    },
    {
      path: "/terminal-product",
      main: <TerminalProduct />,
    },
    {
      path: "/terminal-crane",
      main: <TerminalCrane />,
    },
    {
      path: "/login",
      main: <WMSLogin />,
    },
    {
      path: "/zone-detail/:id",
      main: <ZoneMonitor />,
    },

    {
      path: "/crane-commands",
      main: <CraneCommands />,
    },
    {
      path: "/equipment-commands",
      main: <EquipmentCommands />,
    },
    {
      path: "/terminal-car",
      main: <TerminalCar />,
    },
    {
      path: "/test-page",
      main: <TestPage></TestPage>,
    },
    {
      path: "/history-work",
      main: <HistoryWork />,
    },
  ];
};
export default Routers;

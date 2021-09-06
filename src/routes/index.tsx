import * as React from 'react'
import TerminalProduct from "../layouts/terminal-product";
import Home from "../pages/Home"
export const Routers =()=> {
  return [
      {
          path: "/",
          main:<Home/>
      },
      {
          path: "/terminal-product",
          main: <TerminalProduct/>
      }]
}
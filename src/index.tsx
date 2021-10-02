/*
 * @Author: your name
 * @Date: 2021-08-23 11:13:09
 * @LastEditTime: 2021-10-02 08:28:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/index.tsx
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AppProviders } from './context'
import { AuthProvider } from './auth-content'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
	// <React.StrictMode>
	//   <AppProviders>
	//     <App />
	//   </AppProviders>
	// </React.StrictMode>,
	<Router>
		<AppProviders>
			<AuthProvider>
				<App />
			</AuthProvider>
		</AppProviders>
	</Router>,

	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

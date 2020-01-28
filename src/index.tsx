import React, { useEffect } from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import configureStore, { history } from "./state"
import { ConnectedRouter } from "connected-react-router"
import { Switch, Route } from "react-router-dom"
import EnsureLogin from "./components/EnsureLogin"
import SingleColumnLayout, { Top, Middle, Bottom } from "./layout/SingleColumn"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Login from "./pages/Login"
import Home from "./pages/Home"
import cookiejs from "js-cookie"

const store = configureStore()

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<EnsureLogin>
				<SingleColumnLayout>
					<Top>
						<Header />
					</Top>
					<Middle>
						<Switch>
							<Route path="/login">
								<Login />
							</Route>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</Middle>
					<Bottom>
						<Footer />
					</Bottom>
				</SingleColumnLayout>
			</EnsureLogin>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("container"),
)

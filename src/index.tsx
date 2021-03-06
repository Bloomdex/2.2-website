import * as React from "react"
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
import StationInfo from "./pages/StationViewer"
import Users from "./pages/Users"
import UserPage from "./pages/UserPage"

const store = configureStore()

declare global {
	interface Window {
		store: typeof store
	}
}

window.store = store

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
							<Route path="/stationviewer">
								<StationInfo />
							</Route>
							<Route exact path="/users">
								<Users />
							</Route>
							<Route path="/users/:username">
								<UserPage />
							</Route>
							<Route exact path="/">
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

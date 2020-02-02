import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { createBrowserHistory } from "history"
import {
	routerMiddleware,
	connectRouter,
	RouterState,
	RouterAction,
} from "connected-react-router"
import thunk, { ThunkAction } from "redux-thunk"
import loginFormReducer, { LoginFormAction, LoginFormState } from "./loginForm"
import userReducer, { UserAction, UserState } from "./user"
import stationReducer, { StationAction, StationState } from "./stations"
import { loginSetup, stationMeasurementGetter } from "./middlewares"
import HomeReducer, { HomeAction, HomeState } from "./home"
import stationViewerReducer, {
	StationViewerAction,
	StationVieuwerState,
} from "./stationViewer"
import { AdminUsersAction } from "./adminUsers"

export const history = createBrowserHistory()

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
	}
}

export default function configureStore() {
	return createStore(
		combineReducers({
			router: connectRouter(history),
			loginForm: loginFormReducer,
			user: userReducer,
			stations: stationReducer,
			home: HomeReducer,
			stationViewer: stationViewerReducer,
		}),
		// preloadedState,
		(
			(process.env.BUILD_ENV === "dev"
				? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
				: null) ?? compose
		)(
			applyMiddleware(
				thunk,
				routerMiddleware(history),
				loginSetup,
				stationMeasurementGetter,
			),
		),
	)
}

export type RootState = Readonly<{
	router: Readonly<RouterState>
	loginForm: Readonly<LoginFormState>
	user: Readonly<UserState>
	stations: Readonly<StationState>
	home: Readonly<HomeState>
	stationViewer: Readonly<StationVieuwerState>
}>
export type Action =
	| LoginFormAction
	| UserAction
	| StationAction
	| HomeAction
	| StationViewerAction
	| AdminUsersAction
	| RouterAction

export type MapDispatchToProps = {
	[key: string]: (...props: any) => Action
}

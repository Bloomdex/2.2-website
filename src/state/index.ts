import {
	createStore,
	combineReducers,
	compose,
	applyMiddleware,
	ActionCreator,
} from "redux"
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
import { stationGetter, stationMeasurementGetter } from "./middlewares"
import HomeReducer, { HomeAction, HomeState } from "./home"
import mapReducer, { MapAction, MapState } from "./map"

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
			map: mapReducer,
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
				stationGetter,
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
	map: Readonly<MapState>
}>
export type Action =
	| LoginFormAction
	| UserAction
	| StationAction
	| HomeAction
	| MapAction
	| RouterAction

export type MapDispatchToProps = {
	[key: string]: (...props: any) => Action
}

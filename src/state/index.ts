import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { createBrowserHistory } from "history"
import {
	routerMiddleware,
	connectRouter,
	RouterState,
	RouterAction,
} from "connected-react-router"
import thunk, { ThunkAction } from "redux-thunk"
import userInputReducer, { UserInputAction, UserInputState } from "./UserInput"
import userReducer, { UserAction, UserState } from "./user"
import stationReducer, { StationAction, StationState } from "./stations"
import {
	loginHandling,
	stationMeasurementGetter,
	adminUserApiCalls,
} from "./middlewares"
import HomeReducer, { HomeAction, HomeState } from "./home"
import stationViewerReducer, {
	StationViewerAction,
	StationVieuwerState,
} from "./stationViewer"
import adminUsersReducer, {
	AdminUsersAction,
	AdminUsersState,
} from "./adminUsers"

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
			userInput: userInputReducer,
			user: userReducer,
			stations: stationReducer,
			home: HomeReducer,
			stationViewer: stationViewerReducer,
			adminUsers: adminUsersReducer,
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
				loginHandling,
				stationMeasurementGetter,
				adminUserApiCalls,
			),
		),
	)
}

export type RootState = Readonly<{
	router: Readonly<RouterState>
	userInput: Readonly<UserInputState>
	user: Readonly<UserState>
	stations: Readonly<StationState>
	home: Readonly<HomeState>
	stationViewer: Readonly<StationVieuwerState>
	adminUsers: Readonly<AdminUsersState>
}>
export type Action =
	| UserInputAction
	| UserAction
	| StationAction
	| HomeAction
	| StationViewerAction
	| AdminUsersAction
	| RouterAction

export type MapDispatchToProps = {
	[key: string]: (...props: any) => Action
}

import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { createBrowserHistory } from "history"
import {
	routerMiddleware,
	connectRouter,
	RouterState,
	RouterAction,
} from "connected-react-router"
import thunk from "redux-thunk"
import loginForm, { LoginFormAction, LoginFormState } from "./loginForm"
import user, { UserAction, UserState } from "./user"
import { StationAction, StationState } from "./stations"

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
			loginForm: loginForm,
			user,
		}),
		// preloadedState,
		(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose)(
			applyMiddleware(routerMiddleware(history), thunk),
		),
	)
}

export type RootState = Readonly<{
	router: Readonly<RouterState>
	loginForm: Readonly<LoginFormState>
	user: Readonly<UserState>
	stations: Readonly<StationState>
}>

export type Action = LoginFormAction | UserAction | StationAction | RouterAction

export type MapDispatchToProps = {
	[key: string]: (...props: any) => Action
}

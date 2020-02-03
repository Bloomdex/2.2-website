import { Middleware, Dispatch } from "redux"
import configureStore, { Action, RootState } from "./index"
import {
	getStationsByRadius,
	getCompoundMeasurementMinimal,
	getCompoundMeasurement,
	getLatestMeasurement,
	getDesirableStations,
	UserAuthority,
	getUsers,
	addUser,
	deleteUser,
	addAuthorityToUser,
	removeAuthorityFromUser,
	changeUserPassword,
	logout,
} from "../api"
import { ViewingMethod } from "./stationViewer"
import { AdminUsersAction } from "./adminUsers"
import { push } from "connected-react-router"

let lastActionType: string = ""
export const loginHandling: Middleware<
	{},
	RootState,
	/// @ts-ignore
	Dispatch<Action>
> = store => next => (action: Action) => {
	lastActionType = action.type
	if (action.type === "USER_LOGIN" && lastActionType !== "USER_LOGOUT") {
		store.dispatch(((async (dispatch: Dispatch<Action>) => {
			const stations = await getStationsByRadius()

			dispatch({ type: "ADD_STATIONS", payload: stations })
		}) as unknown) as Action)
		store.dispatch(((async (dispatch: Dispatch<Action>) => {
			const stations = await getDesirableStations()

			dispatch({ type: "HOME_SET_DESIRABLE_STAIONS", payload: stations })
		}) as unknown) as Action)
	}
	if (action.type === "USER_LOGOUT") {
		store.dispatch(((async (dispatch: Dispatch<Action>) => {
			await logout()

			dispatch(push("/login"))
		}) as unknown) as Action)
	}

	next(action)
}

export const stationMeasurementGetter: Middleware<
	{},
	RootState,
	/// @ts-ignore
	Dispatch<Action>
> = store => (next: (a: Action) => void) => (action: Action) => {
	if (action.type === "HOME_SELECT_STATION") {
		store.dispatch(((async (dispatch: Dispatch<Action>) => {
			const stationId = action.payload
			const stations = await getCompoundMeasurementMinimal(stationId)

			dispatch({ type: "HOME_SET_MEASUREMENT", payload: stations })
		}) as unknown) as Action)
	}
	next(action)
	const state = store.getState()
	const stationid = state.stationViewer.selectedStationid
	const measurement = state.stationViewer.selectedStationMeasurement
	const viewMethod = state.stationViewer.viewerState.viewingMethod

	if (stationid) {
		if (
			viewMethod === ViewingMethod.CompoundMeasurement &&
			measurement.compound === null
		) {
			store.dispatch(((async (dispatch: Dispatch<Action>) => {
				const measurement = await getCompoundMeasurement(stationid)
				dispatch({
					type: "STATION_VIEW_SET_COMPOUND_MEASUREMENT",
					payload: measurement,
				})
			}) as unknown) as Action)
		}
		if (
			viewMethod === ViewingMethod.LatestMeasurement &&
			measurement.latest === null
		) {
			store.dispatch(((async (dispatch: Dispatch<Action>) => {
				const measurement = await getLatestMeasurement(stationid)
				dispatch({
					type: "STATION_VIEW_SET_LATEST_MEASUREMENT",
					payload: measurement,
				})
			}) as unknown) as Action)
		}
	}
}

export const adminUserApiCalls: Middleware<
	{},
	RootState,
	/// @ts-ignore
	Dispatch<Action>
> = store => next => (action: AdminUsersAction) => {
	if (
		(action as Action).type === "USER_LOGIN" &&
		/// @ts-ignore
		action.payload.authorities.includes(UserAuthority.Admin)
	) {
		store.dispatch(((async (dispatch: Dispatch<Action>) => {
			const users = await getUsers()
			dispatch({
				type: "ADMIN_USERS_ADD_USERS",
				payload: users,
			})
		}) as unknown) as Action)
	}

	const apiFailed = () => {
		store.dispatch({
			type: "ADMIN_USERS_API_FAILED",
			payload: action,
		})
	}
	switch (action.type) {
		case "ADMIN_USERS_ADD_USER": {
			addUser(action.payload.username, action.payload.password).catch(apiFailed)
			break
		}
		case "ADMIN_USERS_DELETE_USER": {
			if (store.getState().adminUsers.length > 1) {
				deleteUser(action.payload).catch(apiFailed)
			} else {
				throw new Error("You can't delete the last user")
			}
			break
		}
		case "ADMIN_USERS_ADD_AUTHORITY": {
			addAuthorityToUser(
				action.payload.username,
				action.payload.authority,
			).catch(apiFailed)
			break
		}
		case "ADMIN_USERS_REMOVE_AUTHORITY": {
			removeAuthorityFromUser(
				action.payload.username,
				action.payload.authority,
			).catch(apiFailed)
			break
		}
		case "ADMIN_USERS_CHANGE_PASSWORD": {
			changeUserPassword(
				action.payload.username,
				action.payload.password,
			).catch(apiFailed)
		}
	}
	next(action)
}

import { Middleware, Dispatch } from "redux"
import configureStore, { Action, RootState } from "./index"
import { getStations, getAverageMeasurementMinimal } from "../api"

export const stationGetter: Middleware<
	{},
	RootState,
	/// @ts-ignore
	Dispatch<Action>
> = store => next => (action: Action) => {
	if (action.type === "USER_LOGIN") {
		store.dispatch(((async (dispatch: Dispatch<Action>) => {
			const stations = await getStations()

			dispatch({ type: "ADD_STATIONS", payload: stations })
			console.log("hello!")
		}) as unknown) as Action)
	}
	next(action)
}

export const stationMeasurementGetter = (store: any) => (
	next: (a: Action) => void,
) => (action: Action) => {
	if (action.type === "HOME_SELECT_STATION") {
		store.dispatch(((async (dispatch: Dispatch<Action>) => {
			const stationId = action.payload
			const stations = await getAverageMeasurementMinimal(stationId)

			dispatch({ type: "HOME_SET_MEASUREMENT", payload: stations })
		}) as unknown) as Action)
	}
	next(action)
}

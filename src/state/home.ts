import { StationDetails, CompoundMeasurement } from "../api"

export type HomeState = {
	selectedStationId: StationDetails["id"] | null
	measurements: CompoundMeasurement[] | null
}

type HomeActions = {
	selectStation: {
		type: "HOME_SELECT_STATION"
		payload: StationDetails["id"]
	}
	setMeasurement: {
		type: "HOME_SET_MEASUREMENT"
		payload: CompoundMeasurement[]
	}
}
export type HomeAction = HomeActions[keyof HomeActions]

export default function HomeReducer(
	oldState: HomeState = {
		selectedStationId: null,
		measurements: null,
	},
	action: HomeAction,
): HomeState {
	switch (action.type) {
		case "HOME_SELECT_STATION":
			return {
				...oldState,
				selectedStationId: action.payload,
				measurements:
					action.payload === oldState.selectedStationId
						? oldState.measurements
						: null,
			}
		case "HOME_SET_MEASUREMENT":
			return {
				...oldState,
				measurements: action.payload,
			}
		default:
			return oldState
	}
}

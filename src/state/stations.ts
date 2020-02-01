import { StationDetails } from "../api"

export type StationState = {
	default: StationDetails[]
	sortedLatitude: StationDetails[]
}

type StationActions = {
	addStation: {
		type: "ADD_STATION"
		payload: StationDetails
	}
	addStations: {
		type: "ADD_STATIONS"
		payload: StationDetails[]
	}
}

export type StationAction = StationActions[keyof StationActions]

const defaultStationState: StationState = {
	default: [],
	sortedLatitude: [],
}

export default function stationReducer(
	oldState: StationState = defaultStationState,
	action: StationAction,
): StationState {
	switch (action.type) {
		case "ADD_STATION":
			return {
				...oldState,
				default: [...oldState.default, action.payload],
				sortedLatitude: [...oldState.sortedLatitude, action.payload].sort(
					(a, b) => a.latitude - b.latitude,
				),
			}
		case "ADD_STATIONS":
			return {
				...oldState,
				default: [...oldState.default, ...action.payload],
				sortedLatitude: [...oldState.sortedLatitude, ...action.payload].sort(
					(a, b) => a.latitude - b.latitude,
				),
			}
		default:
			return oldState
	}
}

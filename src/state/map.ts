import { StationDetails } from "../api"
export type MapState = {
	selectedStationid: StationDetails["id"] | null
}

type MapActions = {
	setSelectedStationId: {
		type: "MAP_SET_SELECTED_STAION_ID"
		payload: StationDetails["id"]
	}
}

export type MapAction = MapActions[keyof MapActions]

const defaultMapState: MapState = {
	selectedStationid: null,
}

export default function mapReducer(
	oldState: MapState = defaultMapState,
	action: MapAction,
): MapState {
	switch (action.type) {
		case "MAP_SET_SELECTED_STAION_ID":
			return {
				...oldState,
				selectedStationid: action.payload,
			}
		default:
			return oldState
	}
}

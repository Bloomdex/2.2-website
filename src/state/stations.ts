import { StationDetails } from "../api"
import Fuse from "fuse.js"

export type StationState = {
	stations: StationDetails[]
	fuseSeach: Fuse<StationDetails, typeof fuseOptions>
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

const fuseOptions: Fuse.FuseOptions<StationDetails> = {
	shouldSort: true,
	threshold: 0.7,
	keys: ["name", "country"],
}

const defaultStationState: StationState = {
	stations: [],
	fuseSeach: new Fuse([], fuseOptions),
}

export default function stationReducer(
	oldState: StationState = defaultStationState,
	action: StationAction,
): StationState {
	switch (action.type) {
		case "ADD_STATION":
			return {
				...oldState,
				stations: [...oldState.stations, action.payload],
				fuseSeach: new Fuse(
					[...oldState.stations, action.payload],
					fuseOptions,
				),
			}
		case "ADD_STATIONS":
			return {
				...oldState,
				stations: [...oldState.stations, ...action.payload],
				fuseSeach: new Fuse(
					[...oldState.stations, ...action.payload],
					fuseOptions,
				),
			}
		default:
			return oldState
	}
}

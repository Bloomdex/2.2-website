import { StationDetails } from "../api"

export type StationState = StationDetails[]

type StationActions = {
	addStation: {
		type: "ADD_STATION"
		payload: StationDetails
	}
}

export type StationAction = StationActions[keyof StationActions]

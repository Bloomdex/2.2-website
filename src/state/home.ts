import {
	StationDetails,
	CompoundMeasurementMinimal,
	DesirableStation,
} from "../api"

export enum DataType {
	Temperature = 1,
	Rain,
	Humidity,
}

export type HomeState = {
	selectedStationId: StationDetails["id"] | null
	measurements: CompoundMeasurementMinimal[] | null
	dataType: DataType
	desirableStations: DesirableStation[]
}

type HomeActions = {
	selectStation: {
		type: "HOME_SELECT_STATION"
		payload: StationDetails["id"]
	}
	setMeasurement: {
		type: "HOME_SET_MEASUREMENT"
		payload: CompoundMeasurementMinimal[]
	}
	setDataType: {
		type: "HOME_SET_DATA_TYPE"
		payload: DataType
	}
	setDesirableStations: {
		type: "HOME_SET_DESIRABLE_STAIONS"
		payload: DesirableStation[]
	}
}
export type HomeAction = HomeActions[keyof HomeActions]

export default function HomeReducer(
	oldState: HomeState = {
		selectedStationId: null,
		measurements: null,
		dataType: DataType.Temperature,
		desirableStations: [],
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
		case "HOME_SET_DATA_TYPE":
			return {
				...oldState,
				dataType: action.payload,
			}
		case "HOME_SET_DESIRABLE_STAIONS":
			return {
				...oldState,
				desirableStations: action.payload,
			}
		default:
			return oldState
	}
}

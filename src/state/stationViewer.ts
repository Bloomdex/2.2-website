import {
	StationDetails,
	LatLng,
	CompoundMeasurement,
	FullMeasurement,
} from "../api"
import { DEFAULT_CENTER } from "../config"

export enum SelectionMethod {
	Map = 1,
	search,
}
export enum ViewingMethod {
	StationDetails = 1,
	LatestMeasurement,
	CompoundMeasurement,
}
export type StationVieuwerState = {
	selectedStationid: StationDetails["id"] | null
	mapState: {
		center: LatLng
		zoom: number
		// TODO: bounds
	}
	viewerState: {
		selectionMethod: SelectionMethod
		viewingMethod: ViewingMethod
	}
	searchquery: string
	selectedStationMeasurement: {
		compound: CompoundMeasurement | null
		latest: FullMeasurement | null
	}
}

type StationViewerActions = {
	setSelectedStationId: {
		type: "STATION_VIEW_SELECT_STATION"
		payload: StationDetails["id"]
	}
	setUIState: {
		type: "STATION_VIEW_SET_UI_STATE"
		payload: StationVieuwerState["mapState"]
	}
	changeZoom: {
		type: "STATION_VIEW_CHANGE_ZOOM"
		payload: boolean
	}
	setSelectionMethod: {
		type: "STATION_VIEW_SET_SELECTION_METHOD"
		payload: SelectionMethod
	}
	setViewingMethod: {
		type: "STATION_VIEW_SET_VIEWING_METHOD"
		payload: ViewingMethod
	}
	setSearchQuery: {
		type: "STATION_VIEW_SET_SEARCH_QUERY"
		payload: string
	}
	resetStationMeasurement: {
		type: "STATION_VIEW_RESET_STATION_MEASUREMENT"
	}
	setStationCompoundMeasurement: {
		type: "STATION_VIEW_SET_COMPOUND_MEASUREMENT"
		payload: CompoundMeasurement
	}
	setStationLatestMeasurement: {
		type: "STATION_VIEW_SET_LATEST_MEASUREMENT"
		payload: FullMeasurement
	}
}

export type StationViewerAction = StationViewerActions[keyof StationViewerActions]

const defaultStationViewerState: StationVieuwerState = {
	selectedStationid: null,
	mapState: {
		center: DEFAULT_CENTER,
		zoom: 6,
	},
	viewerState: {
		selectionMethod: SelectionMethod.Map,
		viewingMethod: ViewingMethod.StationDetails,
	},
	searchquery: "",
	selectedStationMeasurement: {
		compound: null,
		latest: null,
	},
}

export default function stationViewerReducer(
	oldState: StationVieuwerState = defaultStationViewerState,
	action: StationViewerAction,
): StationVieuwerState {
	switch (action.type) {
		case "STATION_VIEW_SELECT_STATION":
			return {
				...oldState,
				selectedStationid: action.payload,
				selectedStationMeasurement:
					action.payload === oldState.selectedStationid
						? oldState.selectedStationMeasurement
						: defaultStationViewerState.selectedStationMeasurement,
			}
		case "STATION_VIEW_SET_UI_STATE":
			return {
				...oldState,
				mapState: action.payload,
			}
		case "STATION_VIEW_CHANGE_ZOOM":
			return {
				...oldState,
				mapState: {
					...oldState.mapState,
					zoom: oldState.mapState.zoom + (action.payload ? 1 : -1),
				},
			}
		case "STATION_VIEW_SET_SELECTION_METHOD":
			return {
				...oldState,
				viewerState: {
					...oldState.viewerState,
					selectionMethod: action.payload,
				},
			}
		case "STATION_VIEW_SET_VIEWING_METHOD":
			return {
				...oldState,
				viewerState: {
					...oldState.viewerState,
					viewingMethod: action.payload,
				},
			}
		case "STATION_VIEW_SET_SEARCH_QUERY":
			return {
				...oldState,
				searchquery: action.payload,
			}
		case "STATION_VIEW_RESET_STATION_MEASUREMENT":
			return {
				...oldState,
				selectedStationMeasurement:
					defaultStationViewerState.selectedStationMeasurement,
			}
		case "STATION_VIEW_SET_COMPOUND_MEASUREMENT":
			return {
				...oldState,
				selectedStationMeasurement: {
					...oldState.selectedStationMeasurement,
					compound: action.payload,
				},
			}
		case "STATION_VIEW_SET_LATEST_MEASUREMENT":
			return {
				...oldState,
				selectedStationMeasurement: {
					...oldState.selectedStationMeasurement,
					latest: action.payload,
				},
			}
		default:
			return oldState
	}
}

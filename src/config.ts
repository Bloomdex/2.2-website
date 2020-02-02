import { LatLng, StationDetails } from "./api"

export const DEFAULT_BOUNDS = {
	max: {
		latitude: 14.945,
		longitude: -62.183,
	},
	min: {
		latitude: -6.839,
		longitude: -84.155,
	},
}
export const DEFAULT_CENTER: LatLng = {
	latitude: 4.14,
	longitude: -73.15,
}

export const Stations: StationDetails[] = []

export const API_ENDPOINT = process.env.API_ENDPOINT as string

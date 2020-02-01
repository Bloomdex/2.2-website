import { API_ENDPOINT, DEFAULT_BOUNDS, DEFAULT_CENTER } from "./config"

const path = (...parts: string[]) => {
	if (!parts[0].startsWith(API_ENDPOINT)) {
		parts.unshift(API_ENDPOINT)
	}

	return parts.map(p => (p.startsWith("/") ? p.slice(1) : p)).join("/")
}

const get = (url: string, options?: RequestInit, params?: URLSearchParams) =>
	fetch(`${url}${params ? `?${params.toString()}` : ""}`, {
		method: "GET",
		credentials: "include",
		mode: "cors",
		cache: "default",
		...options,
	})

export type UserData = {
	authorities: string[]
	username: string
}

type Credentials = {
	username: string
	password: string
}

type GetLoginFromCookieReturn = {
	username: string
	authorities: string[]
} | null

const WithAuth = ({ username, password }: Credentials) => ({
	Authorization: `Basic ${btoa(`${username}:${password}`)}`,
})

export async function getLoginFromCookie(): Promise<GetLoginFromCookieReturn> {
	const response = await get(path("/me"))
	if (response.ok) {
		return response.json()
	} else {
		return null
	}
}

type GetCurrentUserReturn = UserData | null

export async function getCurrentUser(
	creds: Credentials,
): Promise<GetCurrentUserReturn> {
	const response = await get(path("/me"), {
		headers: {
			...WithAuth(creds),
		},
	})
	if (response.ok) {
		return {
			...(await response.json()),
			password: creds.password,
		}
	} else {
		return null
	}
}

export type LatLng = {
	latitude: number
	longitude: number
}

type LatLngBounds = {
	min: LatLng
	max: LatLng
}

export type StationDetails = {
	id: number
	name: string
	country: string
	elevation: number
} & LatLng

export async function getStations(
	center: LatLng = DEFAULT_CENTER,
	radius: number = 1000,
): Promise<StationDetails[]> {
	const searchParams = new URLSearchParams()
	searchParams.append("latitude", center.latitude.toFixed(3))
	searchParams.append("longitude", center.longitude.toFixed(3))
	searchParams.append("radius_km", radius.toFixed(3))

	const response = await get(
		`${path("/stations/radius")}?${searchParams.toString()}`,
	)

	if (response.ok) {
		return response.json()
	} else {
		throw response.statusText
	}
}

export type Date = {
	year: number
	month: number
	day: number
}

export type CompoundMeasurement = {
	avgTemperature: number
	minTemperature: number
	maxTemperature: number

	avgRainfall: number
	minRainfall: number
	maxRainfall: number

	avgDewPoint: number
} & Date

// type GetMeasureMentsReturn = Promise<
export async function getAverageMeasurementMinimal(
	stationid: StationDetails["id"],
): Promise<CompoundMeasurement[]> {
	const response = await get(
		path(`/stations/${stationid}/measurements/average/month`),
		{},
		new URLSearchParams({ type: "vegaflor" }),
	)

	if (response.ok) {
		return response.json()
	} else {
		throw Error(response.statusText)
	}
}

import { API_ENDPOINT, DEFAULT_BOUNDS, DEFAULT_CENTER } from "./config"
import { push } from "connected-react-router"
import configureStore from "./state"

declare global {
	interface Window {
		store: ReturnType<typeof configureStore>
	}
}

const path = (...parts: string[]) => {
	return [
		window.location.protocol,
		"//",
		window.location.host,
		API_ENDPOINT,
		...parts,
	]
		.map(p => (p.startsWith("/") ? p.slice(1) : p))
		.join("/")
}

const customFetch = (
	url: string,
	options?: RequestInit,
	params?: URLSearchParams,
) =>
	fetch(`${url}${params ? `?${params.toString()}` : ""}`, {
		method: "GET",
		credentials: "include",
		mode: "cors",
		cache: "default",
		...options,
	})

const redirectIfUnauthorized = (response: Response) => {
	if (!response.ok && response.status === 401) {
		window.store.dispatch(push("/login"))
		return true
	} else {
		return false
	}
}

export type UserData = {
	authorities: UserAuthority[]
	username: string
}

type Credentials = {
	username: string
	password: string
}

type GetLoginFromCookieReturn = {
	username: string
	authorities: UserAuthority[]
} | null

const WithAuth = ({ username, password }: Credentials) => ({
	Authorization: `Basic ${btoa(`${username}:${password}`)}`,
})

export async function getLoginFromCookie(): Promise<GetLoginFromCookieReturn> {
	const response = await customFetch(path("/me"))
	if (response.ok) {
		return response.json()
	} else {
		redirectIfUnauthorized(response)
		return null
	}
}

type GetCurrentUserReturn = UserData | null

export async function getCurrentUser(
	creds: Credentials,
): Promise<GetCurrentUserReturn> {
	const response = await customFetch(path("/me"), {
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
		redirectIfUnauthorized(response)
		return null
	}
}

export async function logout() {
	const response = await customFetch(path("/logout"))
	if (response.ok) {
		return response.json()
	} else {
		// redirectIfUnauthorized(response)
		throw new Error(response.statusText)
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

export async function getStationsByRadius(
	center: LatLng = DEFAULT_CENTER,
	radius: number = 1500,
): Promise<StationDetails[]> {
	const searchParams = new URLSearchParams()
	searchParams.append("latitude", center.latitude.toFixed(3))
	searchParams.append("longitude", center.longitude.toFixed(3))
	searchParams.append("radius_km", radius.toFixed(3))

	const response = await customFetch(
		`${path("/stations/radius")}?${searchParams.toString()}`,
	)

	if (response.ok) {
		return response.json()
	} else {
		redirectIfUnauthorized(response)
		throw response.statusText
	}
}

export type Date = {
	year: number
	month: number
	day: number
}

export type CompoundMeasurementMinimal = {
	avgTemperature: number
	minTemperature: number
	maxTemperature: number

	avgRainfall: number
	minRainfall: number
	maxRainfall: number

	avgDewPoint: number
} & Date

// type GetMeasureMentsReturn = Promise<
export async function getCompoundMeasurementMinimal(
	stationid: StationDetails["id"],
): Promise<CompoundMeasurementMinimal[]> {
	const response = await customFetch(
		path(`/stations/${stationid}/measurements/average/month`),
		{},
		new URLSearchParams({ type: "vegaflor" }),
	)

	if (response.ok) {
		return response.json()
	} else {
		redirectIfUnauthorized(response)
		throw Error(response.statusText)
	}
}

export type FullMeasurement = {
	id: number
	stationId: number
	date: string
	temperature: number
	dew_point: number
	air_pressure_station: number
	air_pressure_sea: number
	visibility: number
	wind_speed: number
	wind_direction: number
	rainfall: number
	snowfall: number
	cloud_coverage: number
	freeze: boolean
	rain: boolean
	snow: boolean
	hail: boolean
	storm: boolean
	tornado: boolean
}
export async function getLatestMeasurement(
	stationid: StationDetails["id"],
): Promise<FullMeasurement> {
	const response = await customFetch(
		path(`/paged/measurements`),
		{},
		new URLSearchParams({
			station_id: stationid.toString(),
			sort: "date,desc",
		}),
	)
	if (response.ok) {
		/// @ts-ignore
		const ret = await response.json()
		console.log("ret: ", ret.content[0])
		return ret.content[0]
	} else {
		redirectIfUnauthorized(response)
		throw new Error(response.statusText)
	}
}

export type CompoundMeasurement = {
	stationId: number
	rainfall: number
	visibillity: number
	snowfall: number
	cloudCoverage: number
	dewPoint: number
	airPressureStation: number
	airPressureSea: number
	temperature: number
	windDirection: number
	windSpeed: number
}

export async function getCompoundMeasurement(
	stationid: StationDetails["id"],
): Promise<CompoundMeasurement> {
	const response = await customFetch(
		path(`/stations/${stationid}/measurements/average/month`),
	)

	if (response.ok) {
		return (await response.json())[0]
	} else {
		redirectIfUnauthorized(response)
		throw new Error(response.statusText)
	}
}

export type DesirableStation = CompoundMeasurementMinimal & {
	StationId: number
	avgHumidity: number
}
export async function getDesirableStations(): Promise<DesirableStation[]> {
	const response = await customFetch(
		path("/measurements/average/month/desirable"),
		{},
		new URLSearchParams({ limit: "10" }),
	)
	if (response.ok) {
		return response.json()
	} else {
		redirectIfUnauthorized(response)
		throw new Error(response.statusText)
	}
}

export enum UserAuthority {
	User = "ROLE_USER",
	// Staff = "ROLE_STAFF",
	Admin = "ROLE_ADMIN",
}

export async function getUsers(): Promise<UserData[]> {
	const response = await customFetch(path("/users"))
	if (response.ok) {
		return response.json()
	} else {
		throw new Error(response.statusText)
	}
}

export async function addUser(username: string, password: string) {
	const response = await customFetch(path("/users"), {
		method: "POST",
		body: JSON.stringify({
			username,
			password,
			enabled: true,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
}

export async function deleteUser(username: string) {
	const response = await customFetch(path(`/users/${username}`), {
		method: "DELETE",
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
}

async function changeAuthorityToUser(
	username: string,
	authority: UserAuthority,
	add: boolean,
) {
	const response = await customFetch(
		path(`/users/authority/${username}`),
		{
			method: add ? "POST" : "DELETE",
			headers: {
				"Content-Type": "application/octet-stream",
			},
		},
		new URLSearchParams({ role: authority }),
	)
	if (!response.ok) {
		throw new Error(response.statusText)
	}
}

export const addAuthorityToUser = (
	username: string,
	authority: UserAuthority,
) => changeAuthorityToUser(username, authority, true)

export const removeAuthorityFromUser = (
	username: string,
	authority: UserAuthority,
) => changeAuthorityToUser(username, authority, false)

export async function changeUserPassword(
	username: string,
	newPassword: string,
) {
	const response = await customFetch(path(`/users/${username}`), {
		method: "PUT",
		body: JSON.stringify({ password: newPassword }),
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (!response.ok) {
		throw new Error(response.statusText)
	}
}

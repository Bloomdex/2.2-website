const DEFAULT_BOUNDS = {
	max: {
		latitude: 14.945,
		longitude: -62.183,
	},
	min: {
		latitude: -6.839,
		longitude: -84.155,
	},
}
const DEFAULT_CENTER: LatLng = {
	latitude: 4.14,
	longitude: -73.15,
}

const API_ENDPOINT = process.env.API_ENDPOINT as string

const path = (...parts: string[]) => {
	if (!parts[0].startsWith(API_ENDPOINT)) {
		parts.unshift(API_ENDPOINT)
	}
	return parts.join("/").replace(/(?<!https?:)\/\//, "/")
}

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
	const response = await fetch(path("/me"), {
		credentials: "include",
	})
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
	const response = await fetch(path("/me"), {
		headers: {
			...WithAuth(creds),
		},
		credentials: "include",
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

type LatLng = {
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
	radius: number,
): Promise<StationDetails[]> {
	const url = new URL(path("/stations/radius"))
	url.searchParams.append("latitude", center.latitude.toFixed(3))
	url.searchParams.append("longitude", center.longitude.toFixed(3))
	url.searchParams.append("radius_km", radius.toFixed(3))

	const response = await fetch(url.toString(), {
		credentials: "include",
	})

	if (response.ok) {
		return response.json()
	} else {
		throw response
	}
}

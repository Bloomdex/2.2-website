import { UserData } from "../api"
import { RootState } from "."
import { Middleware } from "redux"
import { Action } from "./index"

export type UserState = {
	isLoggedIn: boolean
} & UserData

type UserActions = {
	login: {
		type: "USER_LOGIN"
		payload: UserData
	}
	logout: {
		type: "USER_LOGOUT"
	}
}

export type UserAction = UserActions[keyof UserActions]

const loggedOutState: UserState = {
	isLoggedIn: false,
	username: "",
	authorities: [],
}

export default function userReducer(
	oldState: UserState = loggedOutState,
	action: UserAction,
): UserState {
	switch (action.type) {
		case "USER_LOGIN": {
			if (oldState.isLoggedIn) {
				throw new Error("Cannot login twice")
			} else {
				return {
					...oldState,
					isLoggedIn: true,
					username: action.payload.username,
					authorities: action.payload.authorities,
				}
			}
		}
		case "USER_LOGOUT": {
			if (!oldState.isLoggedIn) {
				throw new Error("Cannot logout twice")
			} else {
				return loggedOutState
			}
		}
		default:
			return oldState
	}
}

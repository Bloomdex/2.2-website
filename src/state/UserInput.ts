import { UserAuthority } from "../api"
import { Action } from "./index"

export type UserInputState = {
	login: {
		username: string
		password: string
	}
	newUser: {
		username: string
		password: string
	}
	userPage: {
		authority: UserAuthority | "default"
		password: string
	}
}

type UserInputActions = {
	setLoginUsername: {
		type: "USER_INPUT_LOGIN_SET_USERNAME"
		payload: string
	}
	setLoginPassword: {
		type: "USER_INPUT_LOGIN_SET_PASSWORD"
		payload: string
	}
	setNewUserUsername: {
		type: "USER_INPUT_NEW_USER_SET_USERNAME"
		payload: string
	}
	setNewUserPassword: {
		type: "USER_INPUT_NEW_USER_SET_PASSWORD"
		payload: string
	}
	setUserPagePassword: {
		type: "USER_INPUT_USERPAGE_SET_PASSWORD"
		payload: string
	}
	setUserPageAuthority: {
		type: "USER_INPUT_USERPAGE_SET_AUTHORITY"
		payload: UserAuthority
	}
}
export type UserInputAction = UserInputActions[keyof UserInputActions]

const defaultUserInputState: UserInputState = {
	login: {
		username: "",
		password: "",
	},
	newUser: {
		username: "",
		password: "",
	},
	userPage: {
		password: "",
		authority: "default",
	},
}

export default function userInputReducer(
	oldState: UserInputState = defaultUserInputState,
	action: Action,
): UserInputState {
	switch (action.type) {
		case "USER_INPUT_LOGIN_SET_USERNAME":
			return {
				...oldState,
				login: {
					...oldState.login,
					username: action.payload,
				},
			}
		case "USER_INPUT_LOGIN_SET_PASSWORD":
			return {
				...oldState,
				login: {
					...oldState.login,
					password: action.payload,
				},
			}
		case "USER_INPUT_NEW_USER_SET_USERNAME":
			return {
				...oldState,
				newUser: {
					...oldState.newUser,
					username: action.payload,
				},
			}
		case "USER_INPUT_NEW_USER_SET_PASSWORD":
			return {
				...oldState,
				newUser: {
					...oldState.newUser,
					password: action.payload,
				},
			}
		case "USER_INPUT_USERPAGE_SET_PASSWORD":
			return {
				...oldState,
				userPage: {
					...oldState.userPage,
					password: action.payload,
				},
			}
		case "USER_INPUT_USERPAGE_SET_AUTHORITY":
			return {
				...oldState,
				userPage: {
					...oldState.userPage,
					authority: action.payload,
				},
			}
		case "ADMIN_USERS_ADD_AUTHORITY":
			return {
				...oldState,
				userPage: {
					...oldState.userPage,
					authority: "default",
				},
			}
		case "USER_LOGIN":
			return {
				...oldState,
				login: defaultUserInputState.login,
			}
		default:
			return oldState
	}
}

import { UserData, UserAuthority } from "../api"

export type AdminUsersState = UserData[]

type AdminUsersActions = {
	addUsers: {
		type: "ADMIN_USERS_ADD_USERS"
		payload: UserData[]
	}
	addUser: {
		type: "ADMIN_USERS_ADD_USER"
		payload: {
			username: string
			password: string
		}
	}
	deleteUser: {
		type: "ADMIN_USERS_DELETE_USER"
		payload: UserData["username"]
	}
	addAuthorityToUser: {
		type: "ADMIN_USERS_ADD_AUTHORITY"
		payload: {
			username: UserData["username"]
			authority: UserAuthority
		}
	}
	removeAuthorityFromUser: {
		type: "ADMIN_USERS_REMOVE_AUTHORITY"
		payload: {
			username: UserData["username"]
			authority: UserAuthority
		}
	}
	changePassword: {
		type: "ADMIN_USERS_CHANGE_PASSWORD"
		payload: {
			username: UserData["username"]
			password: string
		}
	}
	apiCallFailed: {
		type: "ADMIN_USERS_API_FAILED"
		payload: AdminUsersAction
	}
}

export type AdminUsersAction = AdminUsersActions[keyof AdminUsersActions]

const defaultAdminUsersState: AdminUsersState = []
export default function adminUsersReducer(
	oldState: AdminUsersState = defaultAdminUsersState,
	action: AdminUsersAction,
): AdminUsersState {
	switch (action.type) {
		case "ADMIN_USERS_ADD_USERS":
			return [...oldState, ...action.payload]
		case "ADMIN_USERS_ADD_USER":
			return [
				...oldState,
				{ username: action.payload.username, authorities: [] },
			]
		case "ADMIN_USERS_DELETE_USER":
			return oldState.filter(user => user.username !== action.payload)
		case "ADMIN_USERS_ADD_AUTHORITY":
			return oldState.map(user =>
				user.username === action.payload.username
					? {
							...user,
							authorities: [...user.authorities, action.payload.authority],
					  }
					: user,
			)
		case "ADMIN_USERS_REMOVE_AUTHORITY":
			return oldState.map(user =>
				user.username === action.payload.username
					? {
							...user,
							authorities: user.authorities.filter(
								auth => auth !== action.payload.authority,
							),
					  }
					: user,
			)

		default:
			return oldState
	}
}

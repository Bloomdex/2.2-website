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

export enum LoadingState {
	NotTried = 1,
	Success,
	Failed,
	Pending,
}

export type LoginFormState = {
	username: string
	password: string
	loadingState: LoadingState
}

type LoginFormActions = {
	setUsername: {
		type: "LOGINFORM_SET_USERNAME"
		payload: string
	}
	setPassword: {
		type: "LOGINFORM_SET_PASSWORD"
		payload: string
	}
	loginFailed: {
		type: "LOGINFORM_LOGIN_FAILED"
	}
	loginSuccess: {
		type: "LOGINFORM_LOGIN_SUCCESS"
	}
}
export type LoginFormAction = LoginFormActions[keyof LoginFormActions]

export default function loginForm(
	oldState: LoginFormState = {
		username: "",
		password: "",
		loadingState: LoadingState.NotTried,
	},
	action: LoginFormAction,
): LoginFormState {
	switch (action.type) {
		case "LOGINFORM_SET_USERNAME":
			return {
				...oldState,
				username: action.payload,
			}
		case "LOGINFORM_SET_PASSWORD":
			return {
				...oldState,
				password: action.payload,
			}
		case "LOGINFORM_LOGIN_FAILED":
			return {
				...oldState,
				loadingState: LoadingState.Failed,
			}
		case "LOGINFORM_LOGIN_SUCCESS":
			return {
				...oldState,
				loadingState: LoadingState.Success,
			}
		default:
			return oldState
	}
}

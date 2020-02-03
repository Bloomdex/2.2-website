import * as React from "react"
import { PropsWithChildren } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RootState, Action } from "../state"
import { getLoginFromCookie, UserData } from "../api"
import { Dispatch } from "redux"
import { push } from "connected-react-router"

const mapStateToProps = (state: RootState) => ({
	isLoggedin: state.user.isLoggedIn,
})

const mapDispatchToProps = {
	login: () => {
		return async (dispatch: Dispatch<Action>) => {
			const apiResult = await getLoginFromCookie()
			if (apiResult !== null) {
				dispatch({
					type: "USER_LOGIN",
					payload: {
						username: apiResult.username,
						authorities: apiResult.authorities,
					},
				})
			}
		}
	},
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = PropsWithChildren<ConnectedProps<typeof connector>>

function EnsureLogin({ isLoggedin, login, children }: Props) {
	if (!isLoggedin) {
		login()
	}
	return <>{children}</>
}

export default connector(EnsureLogin)

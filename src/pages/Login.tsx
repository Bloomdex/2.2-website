import React, { useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RootState, MapDispatchToProps, Action } from "../state"
import { Dispatch } from "redux"
import { getCurrentUser } from "../api"
import { push } from "connected-react-router"

const mapStateToProps = (state: RootState) => ({
	username: state.loginForm.username,
	password: state.loginForm.password,
	doRedirect: state.user.isLoggedIn,
})

const mapDispatchToProps = {
	onUsernameChange: (username: string) => ({
		type: "LOGINFORM_SET_USERNAME",
		payload: username,
	}),
	onPasswordChange: (password: string) => ({
		type: "LOGINFORM_SET_PASSWORD",
		payload: password,
	}),
	onSubmit: (username: string, password: string) => {
		return async (dispatch: Dispatch<Action>) => {
			const apiResult = await getCurrentUser({ username, password })
			if (apiResult !== null) {
				dispatch({
					type: "USER_LOGIN",
					payload: {
						username,
						authorities: apiResult.authorities,
					},
				})
				dispatch(push("/"))
			} else {
				dispatch({ type: "LOGINFORM_LOGIN_FAILED" })
			}
		}
	},
	onLoggedIn: () => push("/"),
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

const Login = ({
	username,
	password,
	doRedirect,
	onUsernameChange,
	onPasswordChange,
	onSubmit,
	onLoggedIn,
}: Props) => {
	if (doRedirect) {
		onLoggedIn()
	}
	return (
		<main>
			<form onSubmit={e => e.preventDefault()}>
				<label>
					username{" "}
					<input
						type="text"
						onChange={e => onUsernameChange(e.target.value)}
						value={username}
					/>
				</label>
				<br />
				<label>
					password{" "}
					<input
						type="password"
						onChange={e => onPasswordChange(e.target.value)}
						value={password}
					/>
				</label>
				<br />
				<input
					type="submit"
					value="login"
					onClick={() => {
						onSubmit(username, password)
					}}
				/>
			</form>
		</main>
	)
}

export default connector(Login)

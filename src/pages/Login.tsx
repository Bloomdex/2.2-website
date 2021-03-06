import * as React from "react"
import { CSSProperties } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RootState, MapDispatchToProps, Action } from "../state"
import { Dispatch } from "redux"
import { getCurrentUser } from "../api"
import { push } from "connected-react-router"
import { Redirect } from "react-router"

const mapStateToProps = (state: RootState) => ({
	username: state.userInput.login.username,
	password: state.userInput.login.password,
	doRedirect: state.user.isLoggedIn,
	lastLoginFailed: state.user.lastLoginFailed,
})

const mapDispatchToProps = {
	onUsernameChange: (username: string) => ({
		type: "USER_INPUT_LOGIN_SET_USERNAME",
		payload: username,
	}),
	onPasswordChange: (password: string) => ({
		type: "USER_INPUT_LOGIN_SET_PASSWORD",
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
				dispatch({
					type: "USER_LOGIN_FAILURE",
				})
			}
		}
	},
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

const labelStyle: CSSProperties = {
	margin: "10px",
	display: "inline-block",
}

const Login = ({
	username,
	password,
	doRedirect,
	lastLoginFailed,
	onUsernameChange,
	onPasswordChange,
	onSubmit,
}: Props) => {
	if (doRedirect) {
		return <Redirect to="/" />
	}
	return (
		<main>
			<form onSubmit={e => e.preventDefault()} style={{ textAlign: "center" }}>
				<label style={labelStyle}>
					username:{" "}
					<input
						type="text"
						onChange={e => onUsernameChange(e.target.value)}
						value={username}
					/>
				</label>
				<br />
				<label style={labelStyle}>
					password:{" "}
					<input
						type="password"
						onChange={e => onPasswordChange(e.target.value)}
						value={password}
					/>
				</label>
				<br />
				<input
					style={{
						margin: "auto",
						display: "inline-block",
					}}
					type="submit"
					value="login"
					onClick={() => {
						onSubmit(username, password)
					}}
				/>
				<br />
				{lastLoginFailed ? (
					<span style={{ color: "red" }}>Wrong username or password</span>
				) : null}
			</form>
		</main>
	)
}

export default connector(Login)

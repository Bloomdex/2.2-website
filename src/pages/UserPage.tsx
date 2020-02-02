import React, { CSSProperties } from "react"
import { RootState, MapDispatchToProps } from "../state/index"
import { UserAuthority } from "../api"
import { connect, ConnectedProps } from "react-redux"
import TwoColumnLayout, { Left, Right } from "../layout/TwoColumns"
import { withRouter } from "react-router"

type OwnProps = {
	match: {
		params: { username: string }
	}
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
	username: ownProps.match.params.username,
	authorities:
		state.adminUsers.find(u => u.username === ownProps.match.params.username)
			?.authorities ?? [],
	newPassword: state.userInput.userPage.password,
	newAuthority: state.userInput.userPage.authority,
})

const mapDispatchToProps = {
	addAuthority: (username: string, authority: UserAuthority) => ({
		type: "ADMIN_USERS_ADD_AUTHORITY",
		payload: {
			username,
			authority,
		},
	}),
	removeAuthority: (username: string, authority: UserAuthority) => ({
		type: "ADMIN_USERS_REMOVE_AUTHORITY",
		payload: {
			username,
			authority,
		},
	}),
	setPassword: (payload: string) => ({
		type: "USER_INPUT_USERPAGE_SET_PASSWORD",
		payload,
	}),
	setAuthority: (payload: string) => ({
		type: "USER_INPUT_USERPAGE_SET_AUTHORITY",
		payload,
	}),
	submitPassword: (username: string, password: string) => ({
		type: "ADMIN_USERS_CHANGE_PASSWORD",
		payload: { username, password },
	}),
	submitAuthority: (username: string, authority: UserAuthority) => ({
		type: "ADMIN_USERS_ADD_AUTHORITY",
		payload: { username, authority },
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

const labelStyle: CSSProperties = {
	margin: "10px",
	display: "inline-block",
}

const UserPage = ({
	username,
	authorities,
	removeAuthority,
	newPassword,
	newAuthority,
	setPassword,
	setAuthority,
	submitAuthority,
	submitPassword,
}: Props) => (
	<div>
		<h2>{username}</h2>
		<TwoColumnLayout>
			<Left>
				<h4>Authorities</h4>
				<ul>
					{authorities.map(auth => (
						<li>
							{auth} -{" "}
							<button onClick={() => removeAuthority(username, auth)}>
								remove
							</button>
						</li>
					))}
				</ul>
				<label>
					add authority
					<select
						onChange={e => setAuthority(e.target.value)}
						value={newAuthority}
					>
						<option value={UserAuthority.User}>User</option>
						<option value={UserAuthority.Admin}>Admin</option>
					</select>
				</label>
				<button
					onClick={() =>
						submitAuthority(username, newAuthority as UserAuthority)
					}
				>
					Add authority
				</button>
			</Left>
			<Right>
				<h4>Change password</h4>
				<form
					onSubmit={e => e.preventDefault()}
					style={{ textAlign: "center" }}
				>
					<label style={labelStyle}>
						new password:{" "}
						<input
							type="text"
							onChange={e => setPassword(e.target.value)}
							value={newPassword}
						/>
					</label>
					<br />
					<input
						style={{
							margin: "auto",
							display: "inline-block",
						}}
						type="submit"
						value="change password"
						onClick={() => {
							submitPassword(username, newPassword)
						}}
					/>
				</form>
			</Right>
		</TwoColumnLayout>
	</div>
)

export default withRouter(connector(UserPage))

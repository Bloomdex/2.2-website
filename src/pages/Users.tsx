import React, { CSSProperties } from "react"
import { RootState, MapDispatchToProps } from "../state"
import { ConnectedProps, connect } from "react-redux"
import PossibleLoading from "../components/PossibleLoading"
import Table from "../components/Table"
import TwoColumnLayout, { Left, Right } from "../layout/TwoColumns"
import { Link } from "react-router-dom"

const mapStateToProps = ({ adminUsers }: RootState) => ({
	isLoading: adminUsers.length === 0,
	users: adminUsers,
})

const mapDispatchToProps = {
	addUser: (username: string, password: string) => ({
		type: "ADMIN_USERS_ADD_USER",
		payload: { username, password },
	}),
	deleteUser: (username: string) => ({
		type: "ADMIN_USERS_DELETE_USER",
		payload: username,
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

const Users = ({ users, isLoading, addUser, deleteUser }: Props) => (
	<TwoColumnLayout>
		<Left>
			<PossibleLoading loading={isLoading}>
				<Table
					head={[
						{ key: "username" },
						{ key: "authorities" },
						{ key: "deleteUser", title: "delete user" },
					]}
					data={users.map(u => ({
						...u,
						key: u.username,
						username: <Link to={`/users/${u.username}`}>{u.username}</Link>,
						authorities: u.authorities.join(", "),
						deleteUser:
							users.length > 1 ? (
								<button onClick={() => deleteUser(u.username)}>Delete</button>
							) : (
								"You can't delete the last user"
							),
					}))}
				/>
			</PossibleLoading>
		</Left>
		<Right>
			<AddUserForm />
		</Right>
	</TwoColumnLayout>
)

export default connector(Users)

const newUserMapStateToProps = ({ userInput }: RootState) => userInput.newUser
const newUserMapDispatchToProps = {
	setUsername: (payload: string) => ({
		type: "USER_INPUT_NEW_USER_SET_USERNAME",
		payload,
	}),
	setPassword: (payload: string) => ({
		type: "USER_INPUT_NEW_USER_SET_PASSWORD",
		payload,
	}),
	onSubmit: (username: string, password: string) => ({
		type: "ADMIN_USERS_ADD_USER",
		payload: { username, password },
	}),
}
const newUserConnector = connect(
	newUserMapStateToProps,
	newUserMapDispatchToProps,
)
type NewUserProps = ConnectedProps<typeof newUserConnector>

const labelStyle: CSSProperties = {
	margin: "10px",
	display: "inline-block",
}

const AddUserForm = newUserConnector(
	({
		username,
		password,
		setUsername,
		setPassword,
		onSubmit,
	}: NewUserProps) => (
		<form onSubmit={e => e.preventDefault()} style={{ textAlign: "center" }}>
			<h3>Add user</h3>
			<label style={labelStyle}>
				username:{" "}
				<input
					type="text"
					onChange={e => setUsername(e.target.value)}
					value={username}
				/>
			</label>
			<br />
			<label style={labelStyle}>
				password:{" "}
				<input
					type="text"
					onChange={e => setPassword(e.target.value)}
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
		</form>
	),
)

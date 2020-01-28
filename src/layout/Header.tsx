import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../state"

const mapStateToProps = (state: RootState) => ({
	isLoggedIn: state.user.isLoggedIn,
	username: state.user.username,
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

function Header({ isLoggedIn, username }: Props) {
	let loggedInComponent = null
	if (isLoggedIn) {
		loggedInComponent = (
			<div>
				<span>logged in user: {username}</span>
				<button />
			</div>
		)
	}
	return (
		<header>
			<h1>Hello, world</h1>
		</header>
	)
}

export default connector(Header)

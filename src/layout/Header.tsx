import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../state"

const mapStateToProps = (state: RootState) => ({
	isLoggedIn: state.user.isLoggedIn,
	username: state.user.username,
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

const Header = ({ isLoggedIn, username }: Props) => (
	<header style={{ textAlign: "center" }}>
		<h1>Hello, world</h1>
		{isLoggedIn ? (
			<div>
				<span>logged in user: {username}</span>
				{/* <button /> */}
			</div>
		) : null}
	</header>
)

export default connector(Header)

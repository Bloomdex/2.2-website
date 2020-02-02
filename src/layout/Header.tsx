import React, { CSSProperties } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../state"
import { Link } from "react-router-dom"
import { UserAuthority } from "../api"

const mapStateToProps = (state: RootState) => ({
	isLoggedIn: state.user.isLoggedIn,
	username: state.user.username,
	isAdmin: state.user.authorities.includes(UserAuthority.Admin),
})

const connector = connect(mapStateToProps)

const liStyle: CSSProperties = {
	display: "inline",
	margin: "10px 40px",
}
type Props = ConnectedProps<typeof connector>

const Header = ({ isLoggedIn, username }: Props) => (
	<header
		style={{
			display: "grid",
			gridTemplateRows: "1fr",
			gridTemplateColumns: "400px 600px 1fr 300px",
			width: "100vw",
		}}
	>
		<h1 style={{ margin: "30px auto" }}>Vegaflor weather service</h1>

		{isLoggedIn ? (
			<>
				<ul
					style={{
						display: "inline-block",
						listStyle: "none",
						margin: "auto 20px",
					}}
				>
					<li style={liStyle}>
						<Link to="/">Dashboard</Link>
					</li>
					<li style={liStyle}>
						<Link to="/stationviewer">Stations</Link>
					</li>
					{}
				</ul>
				<span style={{ margin: "auto", gridColumn: "4" }}>
					logged in user: {username}
				</span>
			</>
		) : null}
	</header>
)

export default connector(Header)

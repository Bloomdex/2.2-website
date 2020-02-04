import * as React from "react"
import { CSSProperties } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../state"
import { Link, withRouter } from "react-router-dom"
import { UserAuthority } from "../api"
import logo from "../logo.png"
import { RouterProps } from "react-router"

const mapStateToProps = (state: RootState) => ({
	isLoggedIn: state.user.isLoggedIn,
	username: state.user.username,
	isAdmin: state.user.authorities.includes(UserAuthority.Admin),
})

const mapDispatchToProps = {
	handleLogout: () => ({
		type: "USER_LOGOUT",
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const liStyle: CSSProperties = {
	display: "inline",
	margin: "10px 40px",
	fontWeight: 900,
}
type Props = ConnectedProps<typeof connector> & RouterProps

const Header = ({
	isLoggedIn,
	username,
	isAdmin,
	handleLogout,
	history,
}: Props) => (
	<header
		style={{
			display: "grid",
			gridTemplateRows: "1fr",
			gridTemplateColumns: "max-content 600px 1fr 300px",
			width: "100vw",
			padding: 0,
			boxSizing: "border-box",
			backgroundColor: "#85D5FF",
			justifyItems: "left",
		}}
	>
		<div
			style={{
				margin: "10px",
			}}
		>
			<img src={logo} alt="vegaflor logo" />
			<h2 style={{ margin: "-30px 0px 0px 0px" }}>
				<br /> weather service
			</h2>
		</div>
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
						<Link
							style={history.location.pathname !== "/" ? { color: "grey" } : {}}
							to="/"
						>
							DASHBOARD
						</Link>
					</li>
					<li style={liStyle}>
						<Link
							style={
								history.location.pathname !== "/stationviewer"
									? { color: "grey" }
									: {}
							}
							to="/stationviewer"
						>
							STATIONS
						</Link>
					</li>
					{isAdmin ? (
						<li style={liStyle}>
							<Link
								style={
									history.location.pathname !== "/users"
										? { color: "grey" }
										: {}
								}
								to="/users"
							>
								USERS
							</Link>
						</li>
					) : null}
				</ul>
				<div
					style={{
						display: "inline-block",
						gridColumn: "4",
						margin: "auto 20px",
						textAlign: "center",
						justifySelf: "right",
					}}
				>
					<span style={{ margin: "auto", fontSize: "1.2em" }}>
						logged in user:
						<br />
						{username}
					</span>
					<br />
					<button style={{ fontSize: "1.1em" }} onClick={() => handleLogout()}>
						logout
					</button>
				</div>
			</>
		) : null}
	</header>
)

export default withRouter(connector(Header))

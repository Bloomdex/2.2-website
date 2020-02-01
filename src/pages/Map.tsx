import React from "react"
import TwoColumnLayout, { Left, Right } from "../layout/TwoColumns"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"
import Table from "../components/Table"
import PossibleLoading from "../components/PossibleLoading"
import StationMap from "../components/StationMap"

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps: MapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps)

const Home = ({}: ConnectedProps<typeof connector>) => (
	<TwoColumnLayout>
		<Left>
			<Map />
		</Left>
		<Right></Right>
	</TwoColumnLayout>
)

export default connector(Home)

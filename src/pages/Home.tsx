import React from "react"
import TwoColumnLayout, { Left, Right } from "../layout/TwoColumns"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"
import Table from "../components/Table"
import PossibleLoading from "../components/PossibleLoading"
import MeasurementChart from "../components/MeasurmentChart"

const mapStateToProps = (state: RootState) => ({
	stations: state.stations.sortedLatitude.slice(0, 10),
	selectedStation: state.stations.default.find(
		station => station.id === state.home.selectedStationId,
	),
	stationMeasurements: state.home.measurements,
	stationsIsLoading: state.stations.default.length === 0,
	measurementIsLoading: state.home.measurements === null,
})

const mapDispatchToProps: MapDispatchToProps = {
	rowOnClick: (payload: number) => ({
		type: "HOME_SELECT_STATION",
		payload,
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const Home = ({
	stations,
	rowOnClick,
	selectedStation,
	stationMeasurements,
	stationsIsLoading,
	measurementIsLoading,
}: ConnectedProps<typeof connector>) => (
	<TwoColumnLayout>
		<Left>
			<PossibleLoading loading={stationsIsLoading}>
				<Table
					head={[
						{ key: "name" },
						{ key: "country" },
						{ key: "latitude" },
						{ key: "longitude" },
						{ key: "onClickButton", title: "Show details" },
					]}
					data={stations.map(s => ({
						...s,
						key: s.id.toString(),
						onClickButton: (
							<button
								onClick={() => {
									rowOnClick(s.id)
								}}
							>
								Select
							</button>
						),
					}))}
				/>
			</PossibleLoading>
		</Left>
		<Right>
			{selectedStation ? (
				<PossibleLoading loading={measurementIsLoading}>
					<MeasurementChart />
				</PossibleLoading>
			) : null}
		</Right>
	</TwoColumnLayout>
)

export default connector(Home)

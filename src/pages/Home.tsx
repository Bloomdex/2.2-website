import React from "react"
import TwoColumnLayout, { Left, Right } from "../layout/TwoColumns"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"
import Table from "../components/Table"
import PossibleLoading from "../components/PossibleLoading"
import MeasurementChart from "../components/MeasurmentChart"
import { StationDetails } from "../api"

const mapStateToProps = (state: RootState) => ({
	stations: state.home.desirableStations.map(ds => {
		const res = {
			...ds,
			...(state.stations.stations.find(
				s => s.id === ds.StationId,
			) as StationDetails),
		}
		/// @ts-ignore
		if (res.notFound === true) {
			console.log(ds)
			console.log("state stations:", state.stations.stations)
		}
		return res
	}),
	selectedStation: state.stations.stations.find(
		station => station.id === state.home.selectedStationId,
	),
	stationMeasurements: state.home.measurements,
	stationsIsLoading: state.home.desirableStations.length === 0,
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
	stationsIsLoading,
	measurementIsLoading,
}: ConnectedProps<typeof connector>) => {
	// console.dir(stations)
	return (
		<TwoColumnLayout>
			<Left>
				<PossibleLoading loading={stationsIsLoading}>
					<Table
						head={[
							{ key: "name" },
							{ key: "country" },
							{ key: "maxTemperature" },
							{ key: "avgHumidity" },
							{ key: "onClickButton", title: "Show details" },
						]}
						/// @ts-ignore
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
}
export default connector(Home)

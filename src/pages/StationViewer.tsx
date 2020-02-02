import React, { CSSProperties } from "react"
import TwoColumnLayout, { Left, Right } from "../layout/TwoColumns"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"
import PossibleLoading from "../components/PossibleLoading"
import StationMap from "../components/StationMap"
import GenericTable from "../components/GenericTable"
import SwitchComponent, {
	Case,
	defaultMatch,
} from "../components/SwitchComponent"
import { SelectionMethod, ViewingMethod } from "../state/stationViewer"
import SearchStations from "../components/SearchStations"

const mapStateToProps = (state: RootState) => ({
	selectedData:
		state.stationViewer.viewerState.viewingMethod ===
		ViewingMethod.StationDetails
			? state.stations.stations.find(
					s => s.id === state.stationViewer.selectedStationid,
			  )
			: state.stationViewer.viewerState.viewingMethod ===
			  ViewingMethod.CompoundMeasurement
			? state.stationViewer.selectedStationMeasurement.compound
			: state.stationViewer.selectedStationMeasurement.latest,
	mapState: state.stationViewer.mapState,
	selectionMethod: state.stationViewer.viewerState.selectionMethod,
	viewingMethod: state.stationViewer.viewerState.viewingMethod,
	measurementIsLoading:
		(state.stationViewer.viewerState.viewingMethod ===
			ViewingMethod.CompoundMeasurement &&
			state.stationViewer.selectedStationMeasurement.compound === null) ||
		(state.stationViewer.viewerState.viewingMethod ===
			ViewingMethod.LatestMeasurement &&
			state.stationViewer.selectedStationMeasurement.latest === null),
})

const mapDispatchToProps = {
	setSelectionMethod: (payload: SelectionMethod) => ({
		type: "STATION_VIEW_SET_SELECTION_METHOD",
		payload,
	}),
	setViewingMethod: (payload: ViewingMethod) => ({
		type: "STATION_VIEW_SET_VIEWING_METHOD",
		payload,
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const divStyle: CSSProperties = {
	width: "800px",
	height: "600px",
}
const Stations = ({
	selectedData,
	selectionMethod,
	viewingMethod,
	measurementIsLoading,
	setSelectionMethod,
	setViewingMethod,
}: ConnectedProps<typeof connector>) => {
	return (
		<TwoColumnLayout>
			<Left>
				<div>
					<button onClick={() => setSelectionMethod(SelectionMethod.Map)}>
						Map
					</button>
					<button onClick={() => setSelectionMethod(SelectionMethod.search)}>
						Search
					</button>
					<SwitchComponent value={selectionMethod}>
						<Case match={SelectionMethod.Map}>
							<StationMap divStyle={divStyle} />
						</Case>
						<Case match={SelectionMethod.search}>
							<SearchStations divStyle={divStyle} />
						</Case>
					</SwitchComponent>
				</div>
			</Left>
			<Right>
				{selectedData ? (
					<div>
						<button
							onClick={() => setViewingMethod(ViewingMethod.StationDetails)}
						>
							Station details
						</button>
						<button
							onClick={() => setViewingMethod(ViewingMethod.LatestMeasurement)}
						>
							Latest Measurement
						</button>
						<button
							onClick={() =>
								setViewingMethod(ViewingMethod.CompoundMeasurement)
							}
						>
							Average measurement today
						</button>
						<PossibleLoading loading={measurementIsLoading}>
							<SwitchComponent value={viewingMethod}>
								<Case match={ViewingMethod.StationDetails}>
									<GenericTable data={selectedData} />
								</Case>
								<Case match={ViewingMethod.CompoundMeasurement}>
									<GenericTable data={selectedData} />
								</Case>
								<Case match={ViewingMethod.LatestMeasurement}>
									<GenericTable data={selectedData} />
								</Case>
								<Case match={defaultMatch}>This is wronge</Case>
							</SwitchComponent>
						</PossibleLoading>
					</div>
				) : (
					<span>Select a station</span>
				)}
			</Right>
		</TwoColumnLayout>
	)
}

export default connector(Stations)

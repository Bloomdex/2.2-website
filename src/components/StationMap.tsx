import React from "react"
import Map from "pigeon-maps"
import Marker from "pigeon-marker"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"
import { DEFAULT_CENTER } from "../config"
import { StationDetails } from "../api"

const mapStateToProps = (state: RootState) => ({
	stations: state.stations.default,
})

const mapDispatchToProps = {
	onMarkerClick: (stationid: StationDetails["id"]) => ({
		type: "MAP_SET_SELECTED_STAION_ID",
		payload: stationid,
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const { latitude, longitude } = DEFAULT_CENTER

type Props = ConnectedProps<typeof connector>

const StationMap = ({ stations, onMarkerClick }: Props) => (
	<Map center={[latitude, longitude]} zoom={3} width={500} height={500}>
		{stations.map(s => (
			<Marker
				anchor={[s.latitude, s.longitude]}
				payload={s.id}
				onClick={({ payload }: { payload: number }) => onMarkerClick(payload)}
			/>
		))}
	</Map>
)

export default connector(StationMap)

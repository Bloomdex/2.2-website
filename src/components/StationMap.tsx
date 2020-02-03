import * as React from "react"
import { CSSProperties } from "react"
import Map from "pigeon-maps"
import Marker from "pigeon-marker"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"
import { DEFAULT_CENTER } from "../config"
import { StationDetails, LatLng } from "../api"
import { StationVieuwerState } from "../state/stationViewer"

const mapStateToProps = (state: RootState) => ({
	stations: state.stations.stations,
	zoom: state.stationViewer.mapState.zoom,
	center: [
		state.stationViewer.mapState.center.latitude,
		state.stationViewer.mapState.center.longitude,
	],
})

const mapDispatchToProps = {
	onMarkerClick: (stationid: StationDetails["id"]) => ({
		type: "STATION_VIEW_SELECT_STATION",
		payload: stationid,
	}),
	onMapInteraction: (payload: StationVieuwerState["mapState"]) => ({
		type: "STATION_VIEW_SET_UI_STATE",
		payload,
	}),
	changeZoom: (zoomIn: boolean) => ({
		type: "STATION_VIEW_CHANGE_ZOOM",
		payload: zoomIn,
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector> & { divStyle?: CSSProperties }

const StationMap = ({
	stations,
	zoom,
	center,
	onMarkerClick,
	onMapInteraction,
	changeZoom,
	divStyle,
}: Props) => (
	<div style={divStyle}>
		<Map
			center={center}
			zoom={zoom}
			width={500}
			height={500}
			onBoundsChanged={({
				center,
				zoom,
				initial,
			}: {
				center: [number, number]
				zoom: number
				initial: boolean
			}) => {
				if (!initial) {
					onMapInteraction({
						zoom,
						center: {
							longitude: center[1],
							latitude: center[0],
						},
					})
				}
			}}
		>
			{stations.map(s => (
				<Marker
					key={s.id}
					anchor={[s.latitude, s.longitude]}
					payload={s.id}
					onClick={({ payload }: { payload: number }) => onMarkerClick(payload)}
				/>
			))}
		</Map>
		<br />
		<button onClick={() => changeZoom(true)}>Zoom in</button>
		<button onClick={() => changeZoom(false)}>Zoom out</button>
	</div>
)

export default connector(StationMap)

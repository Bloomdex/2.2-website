import React, { CSSProperties } from "react"
import { RootState, MapDispatchToProps } from "../state"
import { StationDetails } from "../api"
import { connect, ConnectedProps } from "react-redux"
import StationMap from "./StationMap"
import Table from "./Table"

const mapStateToProps = (state: RootState) => ({
	query: state.stationViewer.searchquery,
	searchResults: state.stations.fuseSeach
		.search(state.stationViewer.searchquery)
		.slice(0, 10) as StationDetails[],
})

const mapDispatchToProps = {
	setQuery: (payload: string) => ({
		type: "STATION_VIEW_SET_SEARCH_QUERY",
		payload,
	}),
	selectStation: (payload: StationDetails["id"]) => ({
		type: "STATION_VIEW_SELECT_STATION",
		payload,
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector> & { divStyle?: CSSProperties }

const SearchStations = ({
	query,
	searchResults,
	setQuery,
	selectStation,
	divStyle,
}: Props) => (
	<div style={divStyle}>
		<input
			type="text"
			placeholder="Search by name or country"
			value={query}
			onChange={e => setQuery(e.target.value)}
			style={{
				margin: "10px",
			}}
		/>
		<Table
			style={{ width: "600px" }}
			head={[{ key: "name" }, { key: "country" }, { key: "select" }]}
			data={searchResults.map(s => ({
				...s,
				key: s.id.toString(),
				select: <button onClick={() => selectStation(s.id)}>Select</button>,
			}))}
		/>
	</div>
)

export default connector(SearchStations)

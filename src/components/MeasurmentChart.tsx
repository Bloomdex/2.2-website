import * as React from "react"
import { CSSProperties } from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	LineChartProps,
	Tooltip,
	Label,
} from "recharts"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"
import { DataType } from "../state/home"
import SwitchComponent, { Case } from "./SwitchComponent"
import { cutNumber } from "../util"

const mapStateToProps = (state: RootState) => ({
	data: state.home.measurements?.map(m => ({
		...m,
		date: `${m.year}-${m.month}-${m.day}`,
		avgRainfall: cutNumber(m.avgRainfall, 3),
		avgTemperature: cutNumber(m.avgTemperature, 3),
		avgHumidity: cutNumber(m.avgHumidity, 3),
	})),
	dataType: state.home.dataType,
})

const mapDispatchToProps = {
	setDataType: (payload: DataType) => ({
		type: "HOME_SET_DATA_TYPE",
		payload,
	}),
}

const connector = connect(mapStateToProps, mapDispatchToProps)

//<Line type="monotone" dataKey="avgTemperature" stroke="#ABABAB" />\
// <Line type="monotone" dataKey="avgRainfall" stroke="#123456" />
type Props = ConnectedProps<typeof connector>

const liStyle: CSSProperties = {
	display: "inline",
	margin: "10px 20px",
}

const MeasurementChart = ({ data, dataType, setDataType }: Props) => (
	<div>
		<SwitchComponent value={dataType}>
			<Case match={DataType.Rain}>
				<LineChart data={data} width={700} height={400}>
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />

					<Line type="monotone" dataKey="avgRainfall" stroke="#057BAA" />
					<Line type="monotone" dataKey="minRainfall" stroke="#A8A8A8" />
					<Line type="monotone" dataKey="maxRainfall" stroke="#A8A8A8" />
				</LineChart>
			</Case>
			<Case match={DataType.Temperature}>
				<LineChart data={data} width={700} height={400}>
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="avgTemperature" stroke="#E59F06" />
					<Line type="monotone" dataKey="minTemperature" stroke="#A8A8A8" />
					<Line type="monotone" dataKey="maxTemperature" stroke="#A8A8A8" />
				</LineChart>
			</Case>
			<Case match={DataType.Humidity}>
				<LineChart data={data} width={700} height={400}>
					<XAxis dataKey="date" />
					<YAxis
						label={{
							textAnchor: "precent",
							position: "insideLeft",
						}}
					/>
					<Tooltip />
					<Line type="monotone" dataKey="avgHumidity" stroke="#25a3fc" />
				</LineChart>
			</Case>
		</SwitchComponent>
		<ul style={{ display: "inline-block", listStyle: "none" }}>
			<li style={liStyle}>
				<button onClick={() => setDataType(DataType.Rain)}>View rain</button>
			</li>
			<li style={liStyle}>
				<button onClick={() => setDataType(DataType.Temperature)}>
					View temperature
				</button>
			</li>
			<li style={liStyle}>
				<button onClick={() => setDataType(DataType.Humidity)}>
					View humidity
				</button>
			</li>
		</ul>
	</div>
)

export default connector(MeasurementChart)

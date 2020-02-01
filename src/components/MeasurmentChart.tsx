import React from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	LineChartProps,
	Tooltip,
} from "recharts"
import { RootState, MapDispatchToProps } from "../state"
import { connect, ConnectedProps } from "react-redux"

/*
type CompoundMeasurement = {
	avgTemperature: number
	minTemperature: number
	maxTemperature: number

	avgRainfall: number
	minRainfall: number
	maxRainfall: number

	avgDewPoint: number
} & Date
*/
const mapStateToProps = (state: RootState) => ({
	data: state.home.measurements?.map(m => ({
		...m,
		date: `${m.year}-${m.month}-${m.day}`,
	})),
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

const MeasurementChart = ({ data }: Props) => (
	<LineChart data={data} width={700} height={400}>
		<XAxis dataKey="date" />
		<YAxis />
		<Tooltip />
		<Line type="monotone" dataKey="avgTemperature" stroke="#ABABAB" />\
		<Line type="monotone" dataKey="avgRainfall" stroke="#123456" />
	</LineChart>
)

export default connector(MeasurementChart)

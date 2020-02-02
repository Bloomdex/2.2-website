import React from "react"
import Table, { Props as TableProps } from "./Table"
import { StationDetails } from "../api"

type Props = {
	data: Record<string, any>
}

export default function GenericTable({ data }: Props) {
	console.log("tableData:", data)
	return (
		<Table
			style={{
				width: "400px",
			}}
			head={[{ key: "name" }, { key: "value" }]}
			data={Object.entries(data).map(([key, value]) => ({
				key,
				name: key,
				value: value.toString ? value.toString() : value,
			}))}
		/>
	)
}

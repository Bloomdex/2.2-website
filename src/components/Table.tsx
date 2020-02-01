import React, { CSSProperties } from "react"

type Props<D extends { key: string | number }> = {
	head: { key: keyof D; title?: string }[]
	data: D[]
}

const borders: CSSProperties = {
	border: "1px solid black",
	padding: "10px",
	textAlign: "center",
}

export default function Table<D extends { key: string }>({
	head,
	data,
}: Props<D>) {
	return (
		<table
			style={{
				...borders,
				borderCollapse: "collapse",
			}}
		>
			<thead>
				<tr>
					{head.map(n => (
						<th style={{ ...borders }} key={n.key as string}>
							{n.title ? n.title : n.key}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map(d => (
					<tr key={d.key}>
						{head.map(k => (
							<td style={{ ...borders }} key={k.key as string}>
								{d[k.key]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

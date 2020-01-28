import React, { PropsWithChildren } from "react"
type Props = PropsWithChildren<{}>
export default function TwoColumnLayout({ children }: Props) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateRows: "1fr",
				gridTemplateColumns: "1fr 1fr",
				placeItems: "center",
				width: "100vw",
			}}
		>
			{children}
		</div>
	)
}

export const Left = ({ children }: Props) => (
	<div style={{ gridRow: 1, gridColumn: 1 }}>{children}</div>
)

export const Right = ({ children }: Props) => (
	<div style={{ gridRow: 1, gridColumn: 2 }}>{children}</div>
)

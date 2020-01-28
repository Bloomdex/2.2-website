import React, { PropsWithChildren } from "react"
type Props = PropsWithChildren<{}>

export default function SingleColumnLayout({ children }: Props) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateRows: "100px 1fr 100px",
				gridTemplateColumns: "1fr",
				placeItems: "center",
				height: "100vh",
			}}
		>
			{children}
		</div>
	)
}

export const Top = ({ children }: PropsWithChildren<{}>) => (
	<div
		style={{
			gridRow: 1,
		}}
	>
		{children}
	</div>
)

export const Middle = ({ children }: PropsWithChildren<{}>) => (
	<div
		style={{
			gridRow: 2,
		}}
	>
		{children}
	</div>
)

export const Bottom = ({ children }: PropsWithChildren<{}>) => (
	<div
		style={{
			gridRow: 3,
		}}
	>
		{children}
	</div>
)

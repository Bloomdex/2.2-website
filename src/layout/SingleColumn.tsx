import * as React from "react"
import { PropsWithChildren, CSSProperties } from "react"

type Props = PropsWithChildren<{}>

export default function SingleColumnLayout({ children }: Props) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateRows: "min-content 1fr min-content",
				gridTemplateColumns: "1fr",
				placeItems: "center",
				minHeight: "100vh",
				alignContent: "space-between",
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

export const Middle = ({
	children,
	style,
}: PropsWithChildren<{ style?: CSSProperties }>) => (
	<div
		style={{
			...(style ?? {}),
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

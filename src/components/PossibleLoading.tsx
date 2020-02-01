import React, { HTMLAttributes, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
	loading: boolean
	text?: string
}>
export default function PossibleLoading({ children, loading, text }: Props) {
	if (loading) {
		return <p>{text ? text : "Loading..."}</p>
	} else {
		return <>{children}</>
	}
}

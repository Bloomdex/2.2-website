import * as React from "react"
import { PropsWithChildren, ReactComponentElement } from "react"

type Props<T> = {
	value: T
	children: ReturnType<typeof Case>[] | ReturnType<typeof Case>
}

type CaseProps<T> = PropsWithChildren<{
	match: T
}>

export const defaultMatch = Symbol("defaultMatch")

export default function SwitchComponent<T>({ value, children }: Props<T>) {
	const toReturn = []
	let defaultChild = null
	if (Array.isArray(children)) {
		for (const child of children) {
			if (child.props.match === value) {
				toReturn.push(child)
			}
			if (child.props.match === defaultMatch) {
				defaultChild = child
			}
		}
	} else {
		if (children.props.match === value) {
			toReturn.push(children)
		}
		if (children.props.match === defaultMatch) {
			defaultChild = children
		}
	}
	if (toReturn.length === 0 && defaultChild !== null) {
		toReturn.push(defaultChild)
	}
	return <>{toReturn}</>
}

export function Case<T>({ match: value, children }: CaseProps<T>) {
	return <>{children}</>
}

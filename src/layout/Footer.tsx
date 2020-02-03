import * as React from "react"

export default function Footer() {
	return (
		<div
			style={{
				backgroundColor: "#E4B625",
				height: "100px",
				width: "100vw",
				textAlign: "center",
			}}
		>
			<p style={{ marginTop: "30px", display: "inline-block" }}>
				<a href="https://github.com/bloomdex/2.2-website">Made with &#10084;</a>{" "}
				by <a href="https://bloomdex.org">Bloomdex</a>
			</p>
		</div>
	)
}

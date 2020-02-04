export const cutNumber = (data: number, decCount: number) =>
	parseFloat(data.toFixed(decCount))

export const download = (mine: string, filename: string, data: string) => {
	const downloadButton = document.createElement("a")
	downloadButton.setAttribute(
		"href",
		`data:${mine};charset=utf-8,${encodeURIComponent(data)}`,
	)
	downloadButton.setAttribute("download", filename)
	downloadButton.style.display = "hidden"
	document.body.appendChild(downloadButton)
	downloadButton.click()
	document.body.removeChild(downloadButton)
}

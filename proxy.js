const proxy = require("http-proxy-middleware")
const express = require("express")
const Bundler = require("parcel-bundler")

const bundler = new Bundler("src/index.html", {
	cache: false,
})

const app = express()

app.use(
	"/api",
	proxy({
		target: "http://localhost:8080",
	}),
)

app.use(bundler.middleware())

app.listen(1234)

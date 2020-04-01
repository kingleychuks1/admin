const url = require("url")
const route_handler = require("./route_handler")


function server(req, res) {
	var _url = url.parse(req.url, true)

	// removes first and last slashes
	var path = _url.pathname.replace(/^\/+|\/+$/g, "")

	var hash = _url.hash

	var params = _url.query

	var method = req.method.toLowerCase()

	var headers = req.headers

	let body = []

	req.on("error", (err) => {
		console.error(err)
	})

	req.on("data", (chunk) => {
		body.push(chunk)
	})

	req.on("end", () => {
		// eslint-disable-next-line no-undef
		body = Buffer.concat(body).toString()

		body = body.length > 1 ? JSON.parse(body) : {}

		const request = {
			path,
			hash,
			params,
			method,
			headers,
			body
		}


		var handler = route_handler[`_${method}`][path] || route_handler[`_get`].notfound

		handler(request, function (statusCode, payload) {
			statusCode = typeof (statusCode) == "number" ? statusCode : 200
			payload = typeof (payload) == "object" ? payload : {}

			payload = JSON.stringify(payload)

			res.setHeader("content-type", "application/json")
			res.writeHead(statusCode)
			res.end(payload)
		})
	})
}


module.exports = server
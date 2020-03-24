/**
 * @author Samuel  Omohan
*/

const http = require("http")
const url = require("url")


// Application Contansts
const HTTP_PORT = 2001

/**
 * @param req contains a `request` object
 * @param res contains a `response` object
*/
const server = http.createServer((req, res) => {
	/**
   * TODO: Read request
   *     - Collect URL
   *     - Collect PATH
   *     - Determine METHOD
   *     - Collect PAYLOAD if any
   *     - Breakdown GET url
  */

	var _url = url.parse(req.url, true)

	// removes first and last slashes
	var path = _url.pathname.replace(/^\/+|\/+$/g, "")

	var hash = _url.hash

	var query_string = _url.query

	var method = req.method.toLowerCase()

	var headers = req.headers

	var body = []

	req.on("error", (err) => {
		console.error(err)
	})
  
	req.on("data", (chunk) => {
		body.push(chunk)
	})

	req.on("end", () => {
		// eslint-disable-next-line no-undef
		body = Buffer.concat(body).toString()

		const data = {
			path,
			hash,
			query_string,
			method,
			headers,
			payload: JSON.stringify(body)
		}

		res.end(JSON.stringify(data))
	})
  
})




server.listen(HTTP_PORT, () => {
	console.log(`http://localhost:${HTTP_PORT}`)
})

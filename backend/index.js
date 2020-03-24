/**
 * @author Samuel  Omohan
*/

const http = require("http")
const server_logic = require("./lib/server")


// Application Contansts
const HTTP_PORT = 2001

/**
 * @param req contains a `request` object
 * @param res contains a `response` object
*/
const server = http.createServer((req, res) => {
  server_logic(req, res)  
})


server.listen(HTTP_PORT, () => {
	console.log(`http://localhost:${HTTP_PORT}`)
})
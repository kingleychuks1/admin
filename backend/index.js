/**
 * @author Samuel  Omohan
*/

const http = require('http')
const serverLogic = require('./lib/server')
const axios = require("axios")

// Application Contansts
const HTTP_PORT = 2001

/**
 * @param req contains a `request` object
 * @param res contains a `response` object
*/
const server = http.createServer((req, res) => {
	serverLogic(req, res)
})

server.listen(HTTP_PORT, () => {
	console.log(`http://localhost:${HTTP_PORT}`)


	//async function name() {
	//	const response = await axios.get('http://localhost:2001/token?token_id=BjeFScLlocueJHU')
	//	console.log(response)
	//}
	
	//name()
})



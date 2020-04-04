const Router = require("./routetable")
const DataLib = require("./datalib")
const helpers = require("./helpers")
const axios = require("axios")

const datalib = new DataLib("../../database")
const route = new Router()


const host = "http://localhost:2001/"
const bcrypt = require('bcrypt')
const SALTROUNDS = 10



/**
 * 
 * Not found Route Handler
 */
route.get("notfound", async (req, res) => {
	res(400, { "not found": "not found" })
})



/**
 * 
 * Users Route Handler
 * 
*/
/**
 * Retrieves a user from the database
 */
route.get("/member/", async (req, res) => {
	var token_id = typeof req.headers.token_id == "string" ? req.headers.token_id : false


	if (token_id) {
		datalib.read("tokens", token_id, function (err, token) {
			var isExpired = token.creation_time - Date.now() > 0 ? false : true;

			if (!err || !isExpired) {
				datalib.read("members", token.member_id, function (err, content) {
					if (err || !content) {
						res(400, {
							status: "1",
							error: "Haha! You Fucked Up"
						})
					} else {
						res(200, content)
					}
				})
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up"
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})

/**
 * Creates a new member
 */
route.post("/member/", async (req, res) => {

	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var smemid = typeof response.data.member_id == "string" ? response.data.member_id : false

	var fname = typeof req.body.fname == "string" ? req.body.fname : false
	var lname = typeof req.body.lname == "string" ? req.body.lname : false
	var mname = typeof req.body.mname == "string" ? req.body.mname : false
	var memid = "member" + helpers.randomCharacter(6, "num");
	var email = typeof req.body.email == "string" ? req.body.email : false
	var telno = typeof req.body.telno == "string" ? req.body.telno : false
	var accno = typeof req.body.accno == "string" ? req.body.accno : false

	var accname = typeof req.body.accname == "string" ? req.body.accname : false
	var country = typeof req.body.country == "string" ? req.body.country : false
	var address = typeof req.body.address == "string" ? req.body.address : false


	var bankname = typeof req.body.bankname == "string" ? req.body.bankname : false

	var sfname = typeof req.body.sfname == "string" ? req.body.sfname : false
	var slname = typeof req.body.slname == "string" ? req.body.slname : false
	var saccno = typeof req.body.saccno == "string" ? req.body.saccno : false

	var saccname = typeof req.body.saccname == "string" ? req.body.saccname : false
	var saddress = typeof req.body.saddress == "string" ? req.body.saddress : false

	var sbankname = typeof req.body.sbankname == "string" ? req.body.sbankname : false


	var isArgValid = accname && country && address && fname && lname && mname && memid && email
		&& telno && accno && sfname && slname && smemid && saccno && saccname &&
		saddress && sbankname && bankname && token_is_valid

	if (isArgValid) {
		var content = {
			first_name: fname,
			last_name: lname,
			middle_name: mname,
			member_id: memid,
			email: email,
			address: address,
			phone_number: telno,
			bank_name: bankname,
			account_number: accno,
			account_name: accname,
			country: country,
			password: await bcrypt.hash("12345678", SALTROUNDS),
			sponsor_details: {
				first_name: sfname,
				last_name: slname,
				member_id: smemid,
				address: saddress,
				bank_name: sbankname,
				account_number: saccno,
				account_name: saccname
			},
			sponsored_members: []
		}

		datalib.create("/members/", memid, content, async function (err) {
			if (!err) {
				const member = await axios({
					method: 'get',
					headers: {
						token_id: req.headers.token_id
					},
					url: host + "/member"
				})

				member.data.sponsored_members = Array.isArray(member.data.sponsored_members) ? member.data.sponsored_members : []


				member.data.sponsored_members.push(content.member_id)

				datalib.update("/members/", smemid, member.data, function (err) {
					if (err) {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up"
						})
					} else {
						res(200, member.data)
					}
				})
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up"
				})
			}
		})


	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})

/**
 * Updates an already existing member
 */
route.put("/member/", async (req, res) => {

	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var memid = typeof response.data.member_id == "string" ? response.data.member_id : false

	var fname = typeof req.body.fname == "string" ? req.body.fname : false
	var lname = typeof req.body.lname == "string" ? req.body.lname : false
	var mname = typeof req.body.mname == "string" ? req.body.mname : false
	var email = typeof req.body.email == "string" ? req.body.email : false
	var telno = typeof req.body.telno == "string" ? req.body.telno : false
	var accno = typeof req.body.accno == "string" ? req.body.accno : false

	var passwd = typeof req.body.passwd == "string" ? req.body.passwd : false

	var accname = typeof req.body.accname == "string" ? req.body.accname : false
	var country = typeof req.body.country == "string" ? req.body.country : false
	var address = typeof req.body.address == "string" ? req.body.address : false


	var bankname = typeof req.body.bankname == "string" ? req.body.bankname : false

	if (token_is_valid) {
		datalib.read("members", memid, async function (err, content) {
			if (!err && content) {
				if (fname) {
					content.first_name = fname
				}
				if (lname) {
					content.last_name = lname
				}
				if (mname) {
					content.middle_name = mname
				}
				if (email) {
					content.email = email
				}
				if (telno) {
					content.phone_number = telno
				}
				if (accno) {
					content.account_number = accno
				}
				if (accname) {
					content.account_name = accname
				}
				if (country) {
					content.country = country
				}
				if (address) {
					content.address = address
				}
				if (bankname) {
					content.bank_name = bankname
				}
				if (passwd) {
					content.password = await bcrypt.hash(passwd, SALTROUNDS)
				}

				datalib.update("members", memid, content, function (err) {
					if (err) {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up"
						})
					} else {
						res(200, content)
					}
				})
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up"
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}

})

/**
 * Updates an already existing member
 */
route.get("/sponsored_members", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = member_id && token_is_valid


	if (isArgValid) {
		datalib.read("members", member_id, function (err, document) {
			if (!err) {
				const sponsored_members = datalib.read_files_sync("members", document.sponsored_members)

				res(200, sponsored_members)
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})


/**
 * 
 * Members Route Handler
 * 
*/
route.get("members", async (req, res) => {
	let response

	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = member_id && token_is_valid

	if (isArgValid) {
		var collection = datalib.read_all_sync("members")

		if (collection) {
			collection.forEach((document) => {
				delete document.password
			})
			res(200, collection)
		} else {
			res(500, {
				status: "2",
				error: "Sorry, I Fucked Up",
			})
		}
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})




/**
 * 
 * Tokens Route Handler
 * 
*/
/**
 * creates user token
 */
route.post("token", async (req, res) => {
	var member_id = typeof req.body.memid == "string" ? req.body.memid : false
	if (member_id) {
		var token_id = helpers.randomCharacter(15, "alpha-num")

		var creation_time = Date.now()

		var content = {
			token_id,
			creation_time,
			expiration_time: creation_time + (1000 * 60 * 120),
			member_id
		}

		datalib.create("tokens", token_id, content, function (err) {
			if (err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up"
				})
			} else {
				res(200, content)
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})


/**
 * return user token
 */
route.get("token", async (req, res) => {
	var token_id = typeof req.params.token_id == "string" ? req.params.token_id : false

	if (token_id) {
		datalib.read("tokens", token_id, function (err, token) {
			if (err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up"
				})
			} else {
				res(200, token)
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})


/**
 * updates user token
 */
route.put("token", async (req, res) => {
	var token_id = typeof req.body.token_id == "string" ? req.body.token_id : false

	if (token_id) {
		datalib.read("tokens", token_id, function (err, token) {
			var creation_time = Date.now()
			token.creation_time = creation_time
			token.expiration_time = creation_time + (1000 * 60 * 120)

			datalib.update("tokens", token_id, token, function (err) {
				if (!err) {
					res(200, token)
				} else {
					res(500, {
						status: "2",
						error: "Sorry, I Fucked Up"
					})
				}
			})
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})



/**
 * 
 * Sign In Handler
 * 
*/
route.post("auth", async (req, res) => {
	var memid = typeof req.body.memid == "string" ? req.body.memid : false
	var passwd = typeof req.body.passwd == "string" ? req.body.passwd : false

	var isArgValid = memid && passwd


	if (isArgValid) {
		datalib.read("members", memid, async function (err, data) {
			if (!err && data) {
				data.password = typeof data.password == "string" ? data.password : ""
				const validPassword = await bcrypt.compare(passwd, data.password)

				if (validPassword) {
					const token = await axios({
						method: 'post',
						url: host + "/token",
						data: {
							memid
						}
					})

					if (token) {
						res(200, token.data)
					} else {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up",
							user: false
						})
					}
				} else {
					res(400, {
						status: "1",
						error: "Haha! You Fucked Up",
					})
				}
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up"
		})
	}
})





/**
 * 
 * Reset Password Route Handler
 * 
*/
/**
 * resets password
 */
route.post("reset", (req, res) => {
	var member_id = typeof req.body.memid == "string" ? req.body.memid : false

	if (member_id) {
		datalib.read("members", member_id, async function (err, data) {
			if (err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
					user: false
				})
			} else {
				var password = helpers.randomCharacter(6, "alpha-num-sym")
				data.password = await bcrypt.hash(password, SALTROUNDS)

				datalib.update("members", member_id, data, async function (err) {
					if (err) {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up",
						})
					} else {
						res(200, data)
					}
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})






/**
 * 
 * Products Route Handler
 * 
*/
/**
 * creates and updates product
 */
route.post("product", async (req, res) => {
	var product = typeof req.body.product == "string" ? req.body.product : false
	var price = typeof req.body.price == "number" ? req.body.price : false
	var pv = typeof req.body.pv == "number" ? req.body.pv : false

	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false


	var isArgValid = product && price && pv && token_is_valid && (member_id == "administrator")

	if (isArgValid) {
		const content = {
			product,
			price,
			pv
		}
		datalib.create("products", product, content, function (err) {
			if (err) {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			} else {
				res(200, content)
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})


/**
 * delete product
 */
route.delete("product", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var product = typeof req.body.product == "string" ? req.body.product : false

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = token_is_valid && (member_id == "administrator")

	if (isArgValid) {
		datalib.delete("products", product, function (err) {
			if (!err) {
				res(200, {
					product
				})
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})


/**
 * retreive product product
 */
route.get("product", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = member_id && token_is_valid

	if (isArgValid) {
		var collection = datalib.read_all_sync("products")

		if (collection) {
			res(200, collection)
		} else {
			res(500, {
				status: "2",
				error: "Sorry, I Fucked Up",
			})
		}
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})




/**
 * todo - create ewallet - post - put - get
 */
/**
 * 
 * Orders Route Handlers
 * 
*/
route.post("order", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 
	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var order_id = helpers.randomCharacter(10, "num")
	var type = typeof req.body.type == "string" ? req.body.type : false
	var amount = typeof req.body.amount == "string"? req.body.amount :false
	var pv = typeof req.body.pv == "string"? req.body.pv : false
	var quantity = typeof req.body.quantity == "string"? req.body.quantity : false
	var status = "pending"

	var isArgValid = token_is_valid && amount && order_id && type && pv && member_id && quantity && status

	if(isArgValid) {
		var content = {
			member_id,
			order_id,
			type,
			amount,
			pv,
			quantity,
			status
		}

		datalib.create("orders", order_id, content, function(err) {
			if(!err) {
				res(200, content)
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.get("orders", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = member_id && token_is_valid

	if (isArgValid) {
		var orders = datalib.read_all_sync("orders")

		res(200, orders)
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.put("order", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var order_id = typeof req.body.order_id == "string" ? req.body.order_id : false

	var isArgValid = token_is_valid && member_id && order_id

	if (isArgValid) {
		datalib.read("orders", order_id, function(err, data) {
			if(!err && data) {

				data.status = "resolved"

				datalib.update("orders", order_id, data, function(err) {
					if(!err) {
						res(200, data)
					} else {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up",
						})
					}
				})
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})







/**
 * 
 * announcement Route Handlers
 * 
*/
route.post("announcement", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false


	var title = typeof req.body.title == "string"? req.body.title : false
	var body = typeof req.body.body == "string"? req.body.body : false


	var isArgValid = member_id && token_is_valid && body && title

	if (isArgValid) {
		announcement_id = helpers.randomCharacter(10, "num")

		var content = {
			announcement_id,
			title,
			body,
			date: helpers.getDate(new Date()),
			statistics: 0
		}

		datalib.create("announcements", announcement_id, content, function(err) {
			if(!err) {
				res(200, content)
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.get("announcement", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var announcement_id = typeof req.params.announcement_id == "string" ? req.params.announcement_id : false

	var isArgValid = token_is_valid && member_id && announcement_id

	if (isArgValid) {
		datalib.read("announcements", announcement_id, function(err, content) {
			if(!err && content) {
				content.statistics++

				datalib.update("announcements", announcement_id, content, function(err) {
					if(!err) {
						res(200, content)
					} else {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up",
						})
					}
				})
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.get("announcements", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = member_id && token_is_valid

	if (isArgValid) {
		var announcements = datalib.read_all_sync("announcements")

		res(200, announcements)
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.delete("announcement", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var announcement_id = typeof req.body.announcement_id == "string" ? req.body.announcement_id : false

	var isArgValid = announcement_id && member_id && token_is_valid

	if(isArgValid) {
		datalib.delete("announcements", announcement_id, function(err) {
			if(!err) {
				res(200, {
					announcement_id
				})
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})






/**
 * 
 * announcement Route Handlers
 * 
*/
route.post("message", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false


	var title = typeof req.body.title == "string"? req.body.title : false
	var body = typeof req.body.body == "string"? req.body.body : false


	var isArgValid = member_id && token_is_valid && body && title

	if (isArgValid) {
		message_id = helpers.randomCharacter(10, "num")

		var content = {
			message_id,
			title,
			body,
			date: helpers.getDate(new Date()),
			statistics: 0
		}

		datalib.create("messages", message_id, content, function(err) {
			if(!err) {
				res(200, content)
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.get("message", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var message_id = typeof req.params.message_id == "string" ? req.params.message_id : false

	var isArgValid = token_is_valid && member_id && message_id

	if (isArgValid) {
		datalib.read("messages", message_id, function(err, content) {
			if(!err && content) {
				content.statistics++

				datalib.update("messages", message_id, content, function(err) {
					if(!err) {
						res(200, content)
					} else {
						res(500, {
							status: "2",
							error: "Sorry, I Fucked Up",
						})
					}
				})
			} else {
				res(400, {
					status: "1",
					error: "Haha! You Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.get("messages", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var isArgValid = member_id && token_is_valid

	if (isArgValid) {
		var messages = datalib.read_all_sync("messages")

		res(200, messages)
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})

route.delete("message", async (req, res) => {
	let response
	
	try {
		response = await axios.get(`http://localhost:2001/token?token_id=${req.headers.token_id}`)
	} catch (err) {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	} 

	var token_is_valid = response.data.expiration_time < Number(Date.now()) ? true : false

	var member_id = typeof response.data.member_id == "string" ? response.data.member_id : false

	var message_id = typeof req.body.message_id == "string" ? req.body.message_id : false

	var isArgValid = message_id && member_id && token_is_valid

	if(isArgValid) {
		datalib.delete("messages", message_id, function(err) {
			if(!err) {
				res(200, {
					message_id
				})
			} else {
				res(500, {
					status: "2",
					error: "Sorry, I Fucked Up",
				})
			}
		})
	} else {
		res(400, {
			status: "1",
			error: "Haha! You Fucked Up",
		})
	}
})


module.exports = route
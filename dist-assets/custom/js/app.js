const API = "http://localhost:2001/"

async function authenticate(memid, passwd) {
	memid = typeof memid == "string" && memid.length >= 12 ? memid : false
	passwd = typeof passwd == "string" && passwd.length >= 6 ? passwd : false

	console.log(memid, passwd)

	var isArgValid = memid && passwd

	console.log(isArgValid)

	var body = {
			memid,
			passwd
	}

	if (isArgValid) {
		var token = await fetch(API + "/auth/", {
			method: "post",
			body: JSON.stringify(body)
		})

		token = await token.json()

		return token

	} else {
		//throw error to user
	}
}

function throwError() {

}
# How to Start Up the Server
		$ cd backend 
		$ npm install
		$ npm i -g nodemon
		$ nodemon


# How to consume API
### MEMBER [https:localhost:2001/member]
#### GET - Retrieves User Information
#####	BODY: NONE - PARAMS: member_id
		returns user with the spified token

		{
			"first_name": "John",
			"last_name": "Akinla",
			"middle_name": "anthony",
			"member_id": "member781641",
			"email": "email",
			"address": "address",
			"phone_number": "090-777-890",
			"bank_name": "bank_name",
			"account_number": "account_number",
			"account_name": "account_name",
			"country": "country",
			"sponsor_details": {
				"first_name": "first_name",
				"last_name": "last_name",
				"member_id": "member_id",
				"address": "address",
				"bank_name": "bank_name",
				"account_number": "account_number",
				"account_name": "account_name"
			}
		}

#### PUT - Updates User Object in Database
#####	HEADER: token_id - BODY: "fname", "lname", "mname", "email", "address", "telno", "bankname", "accno", "accname", "country"

		returns user with the spified token
		{
			"first_name": "John",
			"last_name": "Akinla",
			"middle_name": "anthony",
			"member_id": "member781641",
			"email": "email",
			"address": "address",
			"phone_number": "090-777-890",
			"bank_name": "bank_name",
			"account_number": "account_number",
			"account_name": "account_name",
			"country": "country",
			"sponsor_details": {
				"first_name": "first_name",
				"last_name": "last_name",
				"member_id": "member_id",
				"address": "address",
				"bank_name": "bank_name",
				"account_number": "account_number",
				"account_name": "account_name"
			}
		}

#### POST - Returns Newly Created User Object
#####	HEADER: token_id - BODY: "fname", "lname", "mname", "memid", "email", "address", "telno", "bankname", "accno", "accname", "country", "sfname", "slname", "smemid", "saddress", "sbankname", "saccno", "saccname"
		returns user with the spified token
		{
			"first_name": "John",
			"last_name": "Akinla",
			"middle_name": "anthony",
			"member_id": "member781641",
			"email": "email",
			"address": "address",
			"phone_number": "090-777-890",
			"bank_name": "bank_name",
			"account_number": "account_number",
			"account_name": "account_name",
			"country": "country",
			"sponsor_details": {
				"first_name": "first_name",
				"last_name": "last_name",
				"member_id": "member_id",
				"address": "address",
				"bank_name": "bank_name",
				"account_number": "account_number",
				"account_name": "account_name"
			}
		}


### TOKEN [https:localhost:2001/token]
#### GET - Retrieves Token Information
#####	BODY: NONE - HEADER: token_id
		returns retrieves token width token_id header
		{
			"token_id": "BjeFScLlocueJHU",
			"creation_time": 1585750797385,
			"expiration_time": 1585757997385,
			"member_id": "member781641"
		}

#### POST - Creates Token
#####	BODY: NONE - HEADER: member_id
		Creates token with member_id header
		{
			"token_id": "BjeFScLlocueJHU",
			"creation_time": 1585750797385,
			"expiration_time": 1585757997385,
			"member_id": "member781641"
		}

#### PUT - Updates Token by adding 2 hours
#####	BODY: NONE - HEADER: member_id
		Creates token with member_id header
		{
			"token_id": "BjeFScLlocueJHU",
			"creation_time": 1585750797385,
			"expiration_time": 1585757997385,
			"member_id": "member781641"
		}
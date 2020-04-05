class Helpers {

	async sendMessage(message) {
		return message
	}

	rmTrailingSlashes(string) {
		return string.replace(/^\/+|\/+$/g, "")
	}

	/**
	 * Generates random characters 
	 * @param {string} length length of characters to be generated
	 * @param {string} type accepts `num` `alpha` `sym` `alpha-num-sym` `alpha-num`
	 * @returns {string} String containing specified character
	 */
	randomCharacter(length, type) {
		const alphaParams = [
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		]

		const numParams = [
			'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
		]

		const symParams = [
			'!', '@', '`', '~', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', '|', ';', ':', "'", '"', ',',
			'.', '<', '>', '/', '?'
		]

		const genChar = (listOfParams) => {
			const index = Math.floor(Math.random() * (listOfParams.length - 1))
			return listOfParams[index]
		}

		Array.prototype.selectRandom = function () {
			const index = Math.floor(Math.random() * (this.length - 1))
			return this[index]
		}

		let result = '';

		if (type == 'alpha') {
			for (let i = 0; i < length; i++) {
				result += alphaParams.selectRandom()
			}
		}
		else if (type == 'num') {
			for (let i = 0; i < length; i++) {
				result += numParams.selectRandom()
			}
		}
		else if (type == 'sym') {
			for (let i = 0; i < length; i++) {
				result += symParams.selectRandom()
			}
		}
		else if (type == 'alpha-num-sym') {
			for (let i = 0; i < length; i++) {
				const params = [alphaParams, numParams, symParams].selectRandom()
				result += params.selectRandom()
			}
		}
		else if (type == 'alpha-num') {
			for (let i = 0; i < length; i++) {
				const params = [alphaParams, numParams].selectRandom()
				result += params.selectRandom()
			}
		}

		return result;
	}

	/**
	 * 
	 * @param {Date} date a date object
	 * @returns {Object.date}
	 * @returns {Object.month}
	 * @returns {Object.year}
	 * @returns {Object.hours}
	 * @returns {Object.minutes}
	 * @returns {Object.seconds}
	 */
	getDate(date) {
		return {
			date: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
			hours: date.getHours(),
			minutes: date.getMinutes(),
			seconds: date.getSeconds()
		}
	}
}


module.exports = new Helpers()
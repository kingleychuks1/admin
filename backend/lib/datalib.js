const fs = require("fs")
const path = require("path")
const { rmTrailingSlashes } = require("./helpers")

/**
 * @class DataLib Handles all data storage related tasks
 */
class DataLib {

  /**
   * 
   * @param {String} BASE_DIR Holds the path to the base directory to the db
   */
	constructor (BASE_DIR) {
		this.BASE_DIR = path.join(__dirname, rmTrailingSlashes(BASE_DIR))
	}

  /**
   * 
   * @param {String} collection Name of folder or collection to store data
   * @param {String} document Name of record or file to store data
   * @param {Object} content Content to store in the file
   * @param {Function} cb Sends one argument called which is an instance of Error
   * if there was an error and null if no error was found
   */
	create(collection, document, content, cb) {
		fs.open(this.BASE_DIR + "/" + collection + "/" + document + ".json", "wx", function (err, fileDescription) {
			if (!err && fileDescription) {
				var jsonContent = JSON.stringify(content)

				fs.writeFile(fileDescription, jsonContent, function (err) {
					if (!err) {
						fs.close(fileDescription, function (err) {
							if (!err) {
								cb(null)
							} else {
								cb(new Error("Error closing new file"))
							}
						})
					} else {
						cb(new Error("Error writing to new file"))
					}
				})
			} else {
				cb(new Error("Could not create new file, it may already exist"))
			}
		})
	}

  /**
   * 
   * @param {String} collection Name of folder or collection to store data
   * @param {String} document Name of record or file to store data
   * @param {Object} content Content to store in the file
   * @param {Function} cb Sends one argument called which is an instance of Error
   * if there was an error and null if no error was found
   */
	update(collection, document, content, cb) {
		fs.open(this.BASE_DIR + "/" + collection + "/" + document + ".json", "r+", function (err, fileDescriptor) {
			if (!err && fileDescriptor) {
				var jsonContent = JSON.stringify(content)

				fs.ftruncate(fileDescriptor, function (err) {
					if (!err) {
						fs.writeFile(fileDescriptor, jsonContent, function (err) {
							if (!err) {
								fs.close(fileDescriptor, function (err) {
									if (!err) {
										cb(false)
									} else {
										cb(new Error("Error closing the file"))
									}
								})
							} else {
								cb(new Error("Error writing to existing file"))
							}
						})
					} else {
						cb(new Error("Error truncating file"))
					}
				})
			} else {
				cb(new Error("Could not open the file for updating it may not exist yet"))
			}
		})
	}

  /**
   * 
   * @param {String} collection Name of folder or collection to store data
   * @param {String} document Name of record or file to store data
   * @param {Function} cb Sends two arguments. The first argument is the error
   * the second argument is the object received from the file.
   */
	read(collection, document, cb) {
		fs.readFile(this.BASE_DIR + "/" + collection + "/" + document + ".json", "utf8", function (err, content) {
			if (!err && content) {
				var parsedConetent = JSON.parse(content)
				cb(false, parsedConetent)
			} else {
				cb(new Error(err), content)
			}
		})
	}


  /**
   * 
   * @param {String} collection Name of folder or collection to store data
   * @param {String} document Name of record or file to store data
   * @param {Function} cb Sends one argument called which is an instance of Error
   * if there was an error and null if no error
   */
	delete(collection, document, callback) {
		fs.unlink(this.BASE_DIR + "/" + collection + "/" + document + ".json", function (err) {
			if (!err) {
				callback(false)
			} else {
				callback(new Error("Error trying to delete the file"))
			}
		})
	}
}


module.exports = DataLib
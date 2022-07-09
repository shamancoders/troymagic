const { Client } = require('pg')
module.exports = (params, callback) => {
	try {
		let client = new Client(params.config)
		client
			.connect()
			.then(() => {
				if (params.query) {
					client.query(params.query)
						.then(result => emitResult(result, callback))
						.catch(err => emitError(err, callback))
						.finally(()=>client.end())
				} else {
					client.end()
					emitResult(true, callback)
				}
			})
			.catch(err => emitError(err, callback))

	} catch (err) {
		emitError(err, callback)
	}
}

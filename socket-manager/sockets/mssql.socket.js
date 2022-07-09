module.exports = (params, callback) => {
	try {
		const sql = require('mssql')
		sql.connect(params.config)
			.then(pool => {
				if (params.query) {
					pool.query(params.query)
						.then(result => emitResult(result, callback))
						.catch(err => emitError(err, callback))
						.finally(() => pool.close())
				} else {
					pool.close()
					emitResult(true, callback)
				}
			})
			.catch(err => emitError(err, callback))

	} catch (err) {
		emitError(err, callback)
	}
}


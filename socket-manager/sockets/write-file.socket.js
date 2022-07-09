module.exports = (params, callback) => {
	try {
		let filePath = params.filePath
		let encoding = params.encoding || 'utf8'
		if (!filePath)
			return emitError('filePath is required', callback)
		if (!params.data)
			return emitError('data is required', callback)
		
		filePath=htmlEval(filePath)
		let data = params.data.data || params.data

		try {
			data = atob(data)
		} catch { }
		fs.writeFileSync(filePath, params.data, encoding)
		emitResult(true, callback)

	} catch (err) {
		emitError(err, callback)
	}
}


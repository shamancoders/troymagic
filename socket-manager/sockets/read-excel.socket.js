const readXlsxFile = require('read-excel-file/node')
const readSheetNames = require('read-excel-file/node').readSheetNames

module.exports = (params, callback) => {
	try {
		let filePath=params.filePath
		if(!filePath)
			return emitError('filePath is required',callback)
		if(!fs.existsSync(filePath))
		return emitError(`File not found`,callback)

		let obj={}

		readSheetNames(filePath)
			.then(sheets => {
				let i = 0

				let calistir = () => new Promise((resolve, reject) => {
					if (i >= sheets.length)
						return resolve()
					let currSheetName=sheets[i]
					obj[currSheetName] = []
					readXlsxFile(filePath, { sheet: currSheetName })
						.then(rows => {
							obj[currSheetName] =rows
							i++
							setTimeout(()=>calistir().then(resolve).catch(reject), 0)
						})
						.catch(reject)

				})


				calistir()
					.then(() => emitResult(obj,callback))
					.catch(err=>emitError(err,callback))
			})
			.catch(err=>emitError(err, callback))

	} catch (err) {
		emitError(err, callback)
	}
}


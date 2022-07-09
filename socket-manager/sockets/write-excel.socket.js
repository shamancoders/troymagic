const writeXlsxFile  = require('write-excel-file/node')

module.exports = (params, callback) => {
	try {
		if(!params.filePath)
			return emitError('filePath is required',callback)
		let	filePath=htmlEval(filePath)
		let options={
			columns:params.columns,
			schema:params.schema,
			sheet:params.sheet,
			sheets:params.sheets,
			headerStyle:params.headerStyle,
			filePath:filePath,
			fontFamily: params.fontFamily,
  		fontSize: params.fontSize,
  		orientation: params.orientation,
  		dateFormat: params.dateFormat,
  		stickyRowsCount: params.stickyRowsCount,
  		stickyColumnsCount: params.stickyColumnsCount,
			
		}
		
		writeXlsxFile(params.data || [],options)
		.then(res=>emitResult(res,callback))
		.catch(err=>emitError(err,callback))

	} catch (err) {
		emitError(err, callback)
	}
}


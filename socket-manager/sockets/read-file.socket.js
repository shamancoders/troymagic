module.exports = (params, callback) => {
	try {
		let filePath=params.filePath
		let encoding=params.encoding || 'base64'
		if(!filePath)
			return emitError('filePath is required',callback)
		if(!fs.existsSync(filePath))
		return emitError(`File not found`,callback)
		
		if(encoding=='base64'){
			let s=fs.readFileSync(filePath,'utf8')
			emitResult(btoa(s),callback)
		}else if(encoding=='utf8' || encoding=='utf-8'){
			let s=fs.readFileSync(filePath,encoding)
			emitResult(s,callback)
		}else{
			let s=fs.readFileSync(filePath)
			emitResult(s,callback)
		}
	} catch (err) {
		emitError(err, callback)
	}
}


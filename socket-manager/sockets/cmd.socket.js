const cmd=require('node-cmd')
module.exports = (params, callback) => {
	try {
		let command=params.command
		if(!command)
			return emitError('command is required',callback)
		
		cmd.run(command,(err,data,stderr)=>{
			if(!err){
				emitResult(data,callback)
			}else{
				emitError(err,callback)
			}
		})

	} catch (err) {
		emitError(err, callback)
	}
}

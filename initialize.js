module.exports = () => new Promise((resolve, reject) => {
	try {
		require('use-strict')
		require('colors')
		global.fs = require('fs')
		global.path = require('path')
		global.uuid = require('uuid')
		global.atob = require('atob')
		global.btoa = require('btoa')
		global.os = require('os')

		global.moment = require(path.join(__root, 'lib/moment'))
		global.moment.updateLocale('tr')

		global.util = require(path.join(__root, 'lib/util'))
		

		global.config = require(path.join(__root, 'config.json'))

		global.srvConn={id:'',password:''}

		let connFileName=path.join(__root, 'connection.json')
		if(!fs.existsSync(connFileName)){
			fs.writeFileSync(connFileName,JSON.stringify(global.srvConn,null,2),'utf8')
		}else{
			global.srvConn = require(path.join(__root, 'connection.json'))
		}
		
		// Application info
		console.log('-'.repeat(70))
		console.log('Application Name:'.padding(25), config.name.brightYellow)
		console.log('Version:'.padding(25), config.version.yellow)
		console.log('Server URI:'.padding(25), global.config.socketServer.url.cyan)
		console.log('Id:'.padding(25), global.srvConn.id.toConnectorId().brightBlue)
		console.log('Password:'.padding(25), global.srvConn.password.brightBlue)

		console.log('Uptime Started:'.padding(25), timeStamp().yellow)
		console.log('-'.repeat(70))


		resolve()
	} catch (err) {
		reject(err)
	}
})
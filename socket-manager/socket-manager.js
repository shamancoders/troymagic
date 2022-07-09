let io = require("socket.io-client")
global.socket=null
let reConnInterval = 4000
let osInfo = {
  deneme: 'windows 11',
  tarih: new Date()
}

module.exports = () => new Promise((resolve, reject) => {
  try {
    let moduleHolder = socketModuleLoader(path.join(__dirname, 'sockets'), '.socket.js')
    socket = io(global.config.socketServer.url, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 5000,
      timeout: 3000,
      transports: ['websocket']
    })
    socket.connected = false
    socket.connect()

    socket.on('connect', () => {
      socket.connected = true
      if (!global.srvConn.id || !global.srvConn.password) {
        socket.emit('register', osInfo)
      } else {
        socket.emit('subscribe', global.srvConn)
      }
    })
    Object.keys(moduleHolder).forEach((key) => {
      socket.on(key, (...placeholders) => {
        try {
          moduleHolder[key](...placeholders)
        } catch (err) {
          errorLog(`[${key}]`.cyan, err)
          emitError(err)
        }
      })
    })

    resolve('')
  } catch (e) {
    reject(e)
  }
})


function socketModuleLoader(folder, suffix) {
	let holder = {}
	try {

		let files = fs.readdirSync(folder)
		files.forEach((e) => {
			let f = path.join(folder, e)
			if (!fs.statSync(f).isDirectory()) {
				let fileName = path.basename(f)
				let apiName = fileName.substr(0, fileName.length - suffix.length)
				if (apiName != '' && (apiName + suffix) == fileName) {
					holder[apiName] = require(f)
				}
			}
		})

	} catch (err) {
		errorLog(`[WebsocketAPI]`.cyan, 'socketModuleLoader'.green, err)
		process.exit(1)
	}
	return holder
}

global.emitError=(err,callback)=>{
  
  let error = { name: 'Error', message: '' }
	if (typeof err == 'string') {
		error.message = err
	} else {
		error.name = err.name || 'Error'
		if (err.message)
			error.message = err.message
		else
			error.message = err.name || ''
	}

  socket.emit(callback || 'error',false, error)
}

global.emitResult=(data, callback)=>{
  socket.emit(callback || 'message',true,data)
}
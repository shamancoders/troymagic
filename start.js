
global.__root = __dirname // application root folder

require('./initialize')() // initializing some require global variables and include some nodejs modules
  .then(() => {
    if (config.status != 'development') {
      process.on('uncaughtException', err => errorLog('Caught exception: ', err))
      process.on('unhandledRejection', reason => errorLog('Caught Rejection: ', reason))
    }
    let socketManager = require(path.join(__root, 'socket-manager/socket-manager'))
    testKod(455)
      .then(() => socketManager()
        .then(() => eventLog(`Application was started properly :-)`.yellow))
        .catch(showError)
      )
      .catch(showError)
  })
  .catch(showError)

function showError(err) {
  console.log('initialize error:', err)
}

function testKod(a) {
  return new Promise((resolve, reject) => {

    return resolve('fitifiti')
  })

}


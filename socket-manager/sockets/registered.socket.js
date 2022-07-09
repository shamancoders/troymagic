module.exports = (connInfo) => {
	global.srvConn = connInfo
	fs.writeFileSync(path.join(__root, 'connection.json'), JSON.stringify(global.srvConn, null, 2), 'utf8')
	socket.emit('subscribe', global.srvConn)
}

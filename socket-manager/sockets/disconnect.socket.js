module.exports = (reason) => {
	eventLog(`disconnected reason`, reason)

	socket.connected = false
	setTimeout(() => socket.connect(), global.config.socketServer.reconnectionInterval || 5000)
}

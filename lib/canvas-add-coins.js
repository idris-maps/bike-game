var canvas = require('./canvas')

module.exports = function() {
	var id = window.config.count + 1
	window.config.count = id
	var lane = Math.floor(Math.random() * 14)
	var x = Math.floor(Math.random() * 5)
	if(x === 0) {
		canvas.add({
			id: 'coin-life-' + id,
			cl: 'coin-life',	
			lane: lane,
			elId: 'coin-life',
			type: 'image',
			x: window.config.laneWidth * lane,
			y: - (window.config.laneWidth),
			width: window.config.laneWidth,
			height: window.config.laneWidth
		})
	} else {
		canvas.add({
			id: 'coin-cash-' + id,
			cl: 'coin-cash',	
			lane: lane,
			elId: 'coin-cash',
			type: 'image',
			x: window.config.laneWidth * lane,
			y: - (window.config.laneWidth),
			width: window.config.laneWidth,
			height: window.config.laneWidth
		})
	}
}

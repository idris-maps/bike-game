var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['scooter-1', 'scooter-2']
	var imgI = Math.floor(Math.random() * imgs.length)
	var img = imgs[imgI]

	var lanes = [7, 11]
	var laneI = Math.floor(Math.random() * lanes.length)
	var lane = lanes[laneI]

	canvas.add({
		id: 'scooter-right-' + id,
		cl: 'scooter-right',
		lane: lane,
		elId: img,
		type: 'image',
		x: window.config.laneWidth * lane,
		y: window.config.gameH + (window.config.laneWidth * 3),
		width: window.config.laneWidth,
		height: window.config.laneWidth * 3
	})
}

var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['scooter-1-inv', 'scooter-2-inv', 'scooter-3-inv']
	var imgI = Math.floor(Math.random() * imgs.length)
	var img = imgs[imgI]

	var lanes = [2, 6]
	var laneI = Math.floor(Math.random() * lanes.length)
	var lane = lanes[laneI]

	canvas.add({
		id: 'scooter-left-' + id,
		cl: 'scooter-left',	
		lane: lane,
		elId: img,
		type: 'image',
		x: window.config.laneWidth * lane,
		y: - (window.config.laneWidth * 3),
		width: window.config.laneWidth,
		height: window.config.laneWidth * 3
	})
}

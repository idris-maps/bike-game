var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['car-1', 'car-2']
	var imgI = Math.floor(Math.random() * imgs.length)
	var img = imgs[imgI]

	canvas.add({
		id: 'car-right-' + id,
		cl: 'car-right',	
		elId: img,
		type: 'image',
		x: window.config.laneWidth * 8,
		y: -(window.config.laneWidth * 5),
		width: window.config.laneWidth * 3,
		height: window.config.laneWidth * 5
	})
}



var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['car-1-inv', 'car-2-inv', 'car-3-inv', 'car-4-inv', 'car-5-inv']
	var imgI = Math.floor(Math.random() * imgs.length)
	var img = imgs[imgI]

	canvas.add({
		id: 'car-left-' + id,
		cl: 'car-left',	
		elId: img,
		type: 'image',
		x: window.config.laneWidth * 3,
		y: -(window.config.laneWidth * 5),
		width: window.config.laneWidth * 3,
		height: window.config.laneWidth * 5
	})
}



var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['side-1', 'side-2', 'side-3']
	var imgI = Math.floor(Math.random() * imgs.length)
	var img = imgs[imgI]

	canvas.add({
		id: 'side-right-' + id,
		cl: 'side-right',	
		elId: img,
		type: 'image',
		x: window.config.laneWidth * 12,
		y: - window.config.laneWidth,
		width: window.config.laneWidth * 2,
		height: window.config.laneWidth
	})
}

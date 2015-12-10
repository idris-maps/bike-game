var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['side-1-inv']
	var imgI = Math.floor(Math.random() * imgs.length)
	var img = imgs[imgI]

	canvas.add({
		id: 'side-left-' + id,
		cl: 'side-left',	
		elId: img,
		type: 'image',
		x: 0,
		y: - window.config.laneWidth,
		width: window.config.laneWidth * 2,
		height: window.config.laneWidth
	})
}

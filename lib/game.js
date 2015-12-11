var resize = require('./resize')
var render = require('./render')
var addBase = require('./canvas-add-base')
var addObjects = require('./canvas-add-objects')
var addCoins = require('./canvas-add-coins')

module.exports = function() {
	addBase()
	resize()
	window.onresize = function() {
		resize()
	}
	var renderInt = setInterval(function() {
		render()
		window.config.score.points = window.config.score.points + 1
	},40)
	var objInt = setInterval(function() {
		addObjects()
	}, window.config.speed.add)
	var coinInt = setInterval(function() {
		addCoins()
	}, window.config.speed.add * 2)
	var speedInt = setInterval(function() {
		window.config.speed.nb = window.config.speed.nb + 1
	}, 20000)
	var grindInt = setInterval(function() {
		if(window.config.bikeImg.nb === 1) { window.config.bikeImg.nb = 2 } else { window.config.bikeImg.nb = 1 }
	},300)
	window.config.intervals = [renderInt, objInt, coinInt, speedInt, grindInt]
}


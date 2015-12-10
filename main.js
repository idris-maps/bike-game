var resize = require('./lib/resize')
var render = require('./lib/render')
var addBase = require('./lib/canvas-add-base')
var addObjects = require('./lib/canvas-add-objects')
var addCoins = require('./lib/canvas-add-coins')

window.onload = function() {
	setConfig(function() {
		addBase()
		resize()
		window.onresize = function() {
			resize()
		}
		setInterval(function() {
			render()
			window.config.score.points = window.config.score.points + 1
		},40)
		setInterval(function() {
			addObjects()
		}, window.config.speed.add)
		setInterval(function() {
			addCoins()
		}, window.config.speed.add * 2)
		setInterval(function() {
			window.config.speed.nb = window.config.speed.nb + 1
		}, 20000)
	})
}


function setConfig(callback) {
	window.config = {
		objs: [],
		count: 0,
		speed: {
			nb: 2,
			add: 3000
		},
		score: {
			points: 0,
			life: 5,
			boom: false
		}
	}
	callback()
}


/*
setInterval(function() {
	addObjects()
},3000)

setInterval(function() {
	moveObjects()
},100)
*/


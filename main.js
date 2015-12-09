var resize = require('./lib/resize')
var render = require('./lib/render')
var addBase = require('./lib/canvas-add-base')
var addObjects = require('./lib/canvas-add-objects')

window.onload = function() {
	setConfig(function() {
		addBase()
		resize()
		window.onresize = function() {
			resize()
		}
		setInterval(function() {
			render()
		},50)
		setInterval(function() {
			addObjects()
		},3000)
	})
}


function setConfig(callback) {
	window.config = {
		objs: [],
		count: 0,
		speed: {
			nb: 3
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


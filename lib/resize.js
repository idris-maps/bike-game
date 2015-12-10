var canvas = require('./canvas')

module.exports = function() {
	getSize(function(w, h) {
		var game = document.getElementById('game')
		game.style.width = w + 'px'
		game.style.height = h + 'px'
		var x = game.offsetLeft
		window.config.gameX = x
		window.config.gameW = w
		window.config.gameH = h

		var canvasContainer = document.getElementById('canvas-container')
		canvasContainer.style.left = x + 'px'
		canvasContainer.style.width = w + 'px'
		canvasContainer.style.height = h + 'px' 

		canvas.init('canvas-container', {
			width: w,
			height: h
		})
		canvas.set('deco-side-left', {
			width: window.config.laneWidth * 2,
			height: window.config.gameH
		})
		canvas.set('deco-side-right', {
			x: window.config.laneWidth * 12,
			width: window.config.laneWidth * 2,
			height: window.config.gameH
		})
		canvas.set('deco-line', {
			x: w/2 - 1,
			width: 2,
			height: window.config.gameH
		})
		canvas.set('bike', {
			x: w/2 - window.config.laneWidth / 2,
			y: h/2,
			width: window.config.laneWidth,
			height: window.config.laneWidth * 3
		})
		window.config.x = w/2 - window.config.laneWidth / 2
		canvas.setByClass('car-right', {
			x: window.config.laneWidth * 8,
			width: window.config.laneWidth * 3,
			height: window.config.laneWidth * 5
		})
		canvas.setByClass('car-left', {
			x: window.config.laneWidth * 3,
			width: window.config.laneWidth * 3,
			height: window.config.laneWidth * 5
		})
		canvas.setByClass('scooter-right', {
			x: window.config.laneWidth * 7,
			width: window.config.laneWidth,
			height: window.config.laneWidth * 3
		})
		canvas.setByClass('scooter-left', {
			x: window.config.laneWidth * 2,
			width: window.config.laneWidth,
			height: window.config.laneWidth * 3
		})
		canvas.setByClass('side-left', {
			x: 0,
			width: window.config.laneWidth * 2,
			height: window.config.laneWidth
		})
		canvas.setByClass('scooter-left', {
			x: window.config.laneWidth * 12,
			width: window.config.laneWidth * 2,
			height: window.config.laneWidth
		})

		var swipeArea = document.getElementById('swipe-area')
		swipeArea.style.width = w + 'px'
		swipeArea.style.top = h * 0.75 + 'px'
		swipeArea.style.left = x + 'px'

		var swipeCursor = document.getElementById('swipe-cursor')
		swipeCursor.style.left = x + (w / 2 - 25) + 'px'
		enableSwipe()
	})
}

function getSize(callback) {
	var windowWidth = window.innerWidth
	var windowHeight = window.innerHeight
	if(windowWidth < windowHeight) {
		var height = windowHeight
		var width = windowHeight / 16 * 9
	} else {
		var height = windowHeight
		var width = windowHeight / 16 * 9		
	}
	window.config.laneWidth = width / 14
	callback(width, height)
}

function enableSwipe() {
	var cursor = document.getElementById('swipe-cursor')
	var cursorTouch = new Hammer(cursor)
	cursorTouch.on("panleft panright", function(ev) {
		positionCursor(cursor, ev.center.x - window.config.gameX)
	})
}

function positionCursor(cursor, x) {
	if(x < window.config.laneWidth / 2) { x = window.config.laneWidth / 2 }
	if(x > window.config.gameW - window.config.laneWidth / 2) { x = window.config.gameW - window.config.laneWidth / 2 }
	cursor.style.left = window.config.gameX + x - cursor.offsetWidth / 2 + 'px'
	canvas.set('bike', {
		x: x - window.config.laneWidth / 2
	})
	window.config.x = x
}

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var canvas = require('./canvas')

module.exports = function() {
	var bikeImg = document.getElementById('bike')
	canvas.add({
		id: 'deco-side-left',
		cl: 'deco',
		type: 'rect',
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		fill: '#606060'
	})
	canvas.add({
		id: 'deco-side-right',
		cl: 'deco',
		type: 'rect',
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		fill: '#606060'
	})
	canvas.add({
		id: 'deco-line',
		cl: 'deco',
		type: 'rect',
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		fill: '#A0A0A0'
	})
	canvas.add({
		id: 'bike',
		cl: 'bike',
		elId: 'bike',
		type: 'image',
		x: 0,
		y: 0,
		width: 0,
		height: 0
	})
}

},{"./canvas":3}],2:[function(require,module,exports){
var canvas = require('./canvas')
var carRight = require('./objects/car-right')
var scooterRight = require('./objects/scooter-right')
var sideRight = require('./objects/side-right')
var carLeft = require('./objects/car-left')
var scooterLeft = require('./objects/scooter-left')
var sideLeft = require('./objects/side-left')

module.exports = function() {

	var nb = window.config.speed.nb
	var interval = window.config.speed.add/nb

	for(i=0;i<nb;i++) {
			setTimeout(function() {
				addRandomObject()
			}, interval * i)
	}
}

function addRandomObject() {

	var possible = ['car-right', 'scooter-right', 'car-left', 'scooter-left', 'scooter-right', 'car-left', 'scooter-left', 'side-right', 'side-left']

	var possibleIndex = Math.floor(Math.random() * possible.length)
	var object = possible[possibleIndex]
	var id = window.config.count + 1
	window.config.count = id
	checkIfOk(object, function() {
		add(object, id)
	})

}

function add(object, id) {
	if(object === 'car-right') { carRight(id) }
	if(object === 'scooter-right') { scooterRight(id) }
	if(object === 'side-right') { sideRight(id) }
	if(object === 'car-left') { carLeft(id) }
	if(object === 'scooter-left') { scooterLeft(id) }
	if(object === 'side-left') { sideLeft(id) }
}

function checkIfOk(cl, callback) {
	var minY = 1000
	for(i=0;i<window.config.objs.length;i++) {
		var o = window.config.objs[i]
		if(o.cl === cl) { if(o.y < minY) { minY = o.y } }
	}
	if(minY > 0) {
		callback()
	} else {
		setTimeout(function() {
			checkIfOk(cl, callback)
		}, 100)
	}
}

},{"./canvas":3,"./objects/car-left":5,"./objects/car-right":6,"./objects/scooter-left":7,"./objects/scooter-right":8,"./objects/side-left":9,"./objects/side-right":10}],3:[function(require,module,exports){
exports.init = function(canvasContainerId, config) {
	var container = document.getElementById(canvasContainerId)
	container.innerHTML = ''
	var canvas = document.createElement('canvas')
	canvas.width = config.width
	canvas.height = config.height
	container.appendChild(canvas)

	var ctx = canvas.getContext('2d')
	window.config.canvas = canvas
	window.config.ctx = ctx
} 

exports.add = function(config) {
	var newObj = {
		id: config.id,
		type: config.type,
		x: config.x,
		y: config.y,
		width: config.width,
		height: config.height
	}
	if(config.elId !== undefined) { newObj.elId = config.elId }
	if(config.fill !== undefined) { newObj.fill = config.fill }
	if(config.stroke !== undefined) { newObj.stroke = config.stroke }
	if(config.cl !== undefined) { newObj.cl = config.cl }
	if(config.lane !== undefined) { newObj.lane = config.lane }
	window.config.objs.push(newObj)
}

exports.remove = function(id) {
	var objs = window.config.objs
	var newObjs = []
	for(i=0;i<objs.length;i++) {
		if(objs[i].id !== id) {
			newObjs.push(objs[i])
		} 
	}
	window.config.objs = newObjs
}

exports.set = function(id, config) {
	var objs = window.config.objs
	var newObjs = []
	for(i=0;i<objs.length;i++) {
		if(objs[i].id === id) {
			var o = objs[i]
			var keys = []
			for(k in config) { keys.push(k) }
			for(j=0;j<keys.length;j++) {
				o[keys[j]] = config[keys[j]]
			}
			newObjs.push(o)
		} else {
			newObjs.push(objs[i])
		}
	}
	window.config.objs = newObjs
}

exports.setByClass = function(cl, config) {
	var objs = window.config.objs
	var newObjs = []
	for(i=0;i<objs.length;i++) {
		if(objs[i].cl === cl) {
			var o = objs[i]
			var keys = []
			for(k in config) { keys.push(k) }
			for(j=0;j<keys.length;j++) {
				o[keys[j]] = config[keys[j]]
			}
			newObjs.push(o)
		} else {
			newObjs.push(objs[i])
		}
	}
	window.config.objs = newObjs
}

exports.draw = function() {
	var canvas = window.config.canvas
	var ctx = window.config.ctx
	var objs = window.config.objs
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for(i=0;i<objs.length;i++) {
		if(objs[i].type === 'image') {
			var img = document.getElementById(objs[i].elId)
			ctx.drawImage(img, objs[i].x, objs[i].y, objs[i].width, objs[i].height)	
		} else if(objs[i].type === 'rect') {
			ctx.beginPath()
			ctx.rect(objs[i].x, objs[i].y, objs[i].width, objs[i].height)
			if(objs[i].fill !== undefined) {
				ctx.fillStyle = objs[i].fill
				ctx.fill()
			}
			if(objs[i].stroke !== undefined) {
				ctx.strokeStyle = objs[i].stroke
				ctx.stroke()
			}
		}
	}
}

},{}],4:[function(require,module,exports){
exports.initRisk = function() {
	window.config.risk = []
}

exports.addRisk = function(lanes) {
	for(i=0;i<lanes.length;i++) {
		window.config.risk.push(lanes[i])
	}
}

exports.risks = function() {
	if(window.config.risk.length !== 0) {
		check(window.config.risk.sort(), bikeLanes())
	}
}

function bikeLanes() {
	var start = Math.floor((window.config.x - window.config.laneWidth * 0.3) / window.config.laneWidth)
	var end = Math.floor((window.config.x + window.config.laneWidth * 0.3) / window.config.laneWidth)
	if(start === end) { return [start] }
	else { return [start, end] }
}

function check(objs, bike) {
	var boom = false
	for(i=0;i<objs.length;i++) {
		for(j=0;j<bike.length;j++) {
			if(objs[i] === bike[j]) { boom = true }
		}
	}
	if(boom === true) {
		document.body.style['background-color'] = 'red'
		setTimeout(function() {
			document.body.style['background-color'] = 'white'		
		}, 500)
	}
}

},{}],5:[function(require,module,exports){
var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['car-1-inv', 'car-2-inv']
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



},{"../canvas":3}],6:[function(require,module,exports){
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



},{"../canvas":3}],7:[function(require,module,exports){
var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['scooter-1-inv', 'scooter-2-inv']
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

},{"../canvas":3}],8:[function(require,module,exports){
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

},{"../canvas":3}],9:[function(require,module,exports){
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

},{"../canvas":3}],10:[function(require,module,exports){
var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['side-1']
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

},{"../canvas":3}],11:[function(require,module,exports){
var canvas = require('./canvas')
var collision = require('./collision')

module.exports = function() {
	collision.initRisk()
	var objs = window.config.objs
	moveLoop(0, objs, function() {
		collision.risks()
		canvas.draw()
	})
}

function moveLoop(count, objs, callback) {

	if(count === objs.length) { callback() }
	else {
		var o = objs[count]
		var id = o.id
		var oldY = o.y
		if(o.cl === 'car-right') { 
			var newY = oldY + (window.config.gameH / 100) * 0.5
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkRisk(newY, 5, [8,9,10])
			} 
		} else if(o.cl === 'car-left') {
			var newY = oldY + (window.config.gameH / 100) * 2.5
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkRisk(newY, 5, [3,4,5])
			} 		
		} else if(o.cl === 'scooter-right') {
			var newY = oldY - (window.config.gameH / 100) * 1
			if(newY < 0 - window.config.laneWidth * 3) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkRisk(newY, 3, [o.lane])
			}	
		} else if(o.cl === 'scooter-left') {
			var newY = oldY + (window.config.gameH / 100) * 4
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkRisk(newY, 3, [o.lane])
			} 
		} else if(o.cl === 'side-left') {
			var newY = oldY + (window.config.gameH / 100) * 1
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkRisk(newY, 1, [1,2])
			} 
		} else if(o.cl === 'side-right') {
			var newY = oldY + (window.config.gameH / 100) * 1
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkRisk(newY, 1, [13,14])
			} 
		}
		count = count + 1
		moveLoop(count, objs, callback)
	}
}

function checkRisk(y, h, lanes) {
	var laneWidth = window.config.laneWidth
	var riskStart = window.config.gameH / 2 + laneWidth * 1
	var riskEnd = window.config.gameH / 2 + laneWidth * 2
	if(y > riskStart - laneWidth * h && y < riskEnd) {
		collision.addRisk(lanes)
	}
}


},{"./canvas":3,"./collision":4}],12:[function(require,module,exports){
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
		swipeArea.style.top = (h - 50 - 20) + 'px'
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

},{"./canvas":3}],13:[function(require,module,exports){
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
		}, window.config.speed.add)
	})
}


function setConfig(callback) {
	window.config = {
		objs: [],
		count: 0,
		speed: {
			nb: 3,
			add: 3000
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


},{"./lib/canvas-add-base":1,"./lib/canvas-add-objects":2,"./lib/render":11,"./lib/resize":12}]},{},[13]);

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
		elId: 'bike-1',
		type: 'image',
		x: 0,
		y: 0,
		width: 0,
		height: 0
	})
	canvas.add({
		id: 'score-rect',
		cl: 'score',
		type: 'rect',
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		fill: 'black'
	})
	canvas.add({
		id: 'score-text',
		cl: 'score',
		type: 'text',
		text: 0,
		fontFamily: 'Arial',
		x: 0,
		y: 0,
		fill: 'white'
	})
	canvas.add({
		id: 'score-life-0',
		cl: 'score',
		elId: 'star',
		type: 'image',
		x: 0,
		y: 0,
		width: 0,
		height: 0
	})
	canvas.add({
		id: 'score-life-1',
		cl: 'score',
		elId: 'star',
		type: 'image',
		x: 0,
		y: 0,
		width: 0,
		height: 0
	})
	canvas.add({
		id: 'score-life-2',
		cl: 'score',
		elId: 'star',
		type: 'image',
		x: 0,
		y: 0,
		width: 0,
		height: 0
	})
	canvas.add({
		id: 'score-life-3',
		cl: 'score',
		elId: 'star',
		type: 'image',
		x: 0,
		y: 0,
		width: 0,
		height: 0
	})
	canvas.add({
		id: 'score-life-4',
		cl: 'score',
		elId: 'star',
		type: 'image',
		x: 0,
		y: 0,
		width: 0,
		height: 0
	})
}

},{"./canvas":4}],2:[function(require,module,exports){
var canvas = require('./canvas')

module.exports = function() {
	var id = window.config.count + 1
	window.config.count = id
	var lane = Math.floor(Math.random() * 14)
	var x = Math.floor(Math.random() * 5)
	if(x === 0) {
		canvas.add({
			id: 'coin-life-' + id,
			cl: 'coin-life',	
			lane: lane,
			elId: 'coin-life',
			type: 'image',
			x: window.config.laneWidth * lane,
			y: - (window.config.laneWidth),
			width: window.config.laneWidth,
			height: window.config.laneWidth
		})
	} else {
		canvas.add({
			id: 'coin-cash-' + id,
			cl: 'coin-cash',	
			lane: lane,
			elId: 'coin-cash',
			type: 'image',
			x: window.config.laneWidth * lane,
			y: - (window.config.laneWidth),
			width: window.config.laneWidth,
			height: window.config.laneWidth
		})
	}
}

},{"./canvas":4}],3:[function(require,module,exports){
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
	if(checkIfOk(object) === true) { add(object, id) }
}

function add(object, id) {
	if(object === 'car-right') { carRight(id) }
	if(object === 'scooter-right') { scooterRight(id) }
	if(object === 'side-right') { sideRight(id) }
	if(object === 'car-left') { carLeft(id) }
	if(object === 'scooter-left') { scooterLeft(id) }
	if(object === 'side-left') { sideLeft(id) }
}

function checkIfOk(cl) {
	var minY = 1000
	for(i=0;i<window.config.objs.length;i++) {
		var o = window.config.objs[i]
		if(o.cl === cl) { if(o.y < minY) { minY = o.y } }
	}
	if(minY > 0) {
		return true
	} else {
		return false
	}
}

},{"./canvas":4,"./objects/car-left":8,"./objects/car-right":9,"./objects/scooter-left":10,"./objects/scooter-right":11,"./objects/side-left":12,"./objects/side-right":13}],4:[function(require,module,exports){
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
		y: config.y
	}
	if(config.width !== undefined) { newObj.width = config.width }
	if(config.height !== undefined) { newObj.height = config.height }
	if(config.elId !== undefined) { newObj.elId = config.elId }
	if(config.fill !== undefined) { newObj.fill = config.fill }
	if(config.stroke !== undefined) { newObj.stroke = config.stroke }
	if(config.cl !== undefined) { newObj.cl = config.cl }
	if(config.lane !== undefined) { newObj.lane = config.lane }
	if(config.text !== undefined) { newObj.text = config.text }
	if(config.opacity !== undefined) { newObj.opacity = config.opacity }
	if(config.fontFamily !== undefined) { newObj.fontFamily = config.fontFamily }
	if(config.fontSize !== undefined) { newObj.fontSize = config.fontSize }
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

		if(objs[i].opacity === undefined) {
			ctx.globalAlpha = 1
		} else {
			ctx.globalAlpha = objs[i].opacity
		}

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
		} else if(objs[i].type === 'text') {
			if(objs[i].text === undefined) { var txt = 'text' } else { var txt = objs[i].text }
			if(objs[i].fontSize === undefined) { var fSize = 10 } else { var fSize = objs[i].fontSize }
			if(objs[i].fontFamily === undefined) { var fFam = 'Arial' } else { var fFam = objs[i].fontFamily }
			ctx.beginPath()
			ctx.font = fSize.toString() + 'px ' + fFam
			if(objs[i].fill !== undefined) {
				ctx.fillStyle = objs[i].fill
				ctx.fillText(txt, objs[i].x, objs[i].y)
			}
			if(objs[i].stroke !== undefined) {
				ctx.strokeStyle = objs[i].stroke
				ctx.stroke()
				ctx.strokeText(txt, objs[i].x, objs[i].y)
			}
		}
	}
}

},{}],5:[function(require,module,exports){
var canvas = require('./canvas')
var onGameOver = require('./game-over')

exports.initRisk = function() {
	window.config.risk = []
	window.config.coin = null
}

exports.addRisk = function(lanes) {
	for(i=0;i<lanes.length;i++) {
		window.config.risk.push(lanes[i])
	}
}

exports.addCoin = function(lane, id, type) {
	window.config.coin = {lane: lane, id: id, type: type}
}

exports.risks = function() {
	if(window.config.risk.length !== 0 && window.config.score.boom === false) {
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
		window.config.score.boom = true
		window.config.score.life = window.config.score.life - 1
		if(window.config.score.life === 0) { 
			onGameOver()
		}
		else { 
			window.config.bikeImg.red = true
			setTimeout(function() {
				window.config.bikeImg.red = false	
				window.config.score.boom = false
			}, 500)
		}
	}
}

exports.coins = function() {
	if(window.config.coin !== null) {
		checkCoin(window.config.coin,  bikeLanes())
	}
}

function checkCoin(coin, bike) {
	var boom = false
	for(i=0;i<bike.length;i++) {
		if(coin.lane === bike[i]) { boom = true }
	}
	if(boom === true) {
		canvas.remove(coin.id)
		if(coin.type === 'cash') { window.config.score.points = window.config.score.points + 100 }
		else { 
			if(window.config.score.life < 5) { window.config.score.life = window.config.score.life + 1 }
			else { window.config.score.points = window.config.score.points + 500 }
		}
	}
}



},{"./canvas":4,"./game-over":6}],6:[function(require,module,exports){
var canvas = require('./canvas')

module.exports = function() {
	for(i=0;i<window.config.intervals.length;i++) {
		clearInterval(window.config.intervals[i])
	}

	var w = window.config.laneWidth * 5
	var x = window.config.x - w/2
	var y = window.config.gameH / 2 + window.config.laneWidth * 1.5 - w/2
	canvas.add({
		id: 'explosion',
		cl: 'gameover',
		type: 'image',
		elId: 'expl-1',
		x: x,
		y: y,
		width: w,
		height: w,
		fill: 'yellow'
	})
	canvas.draw()
	setTimeout(function() {
		canvas.set('explosion', {
			elId: 'expl-2'
		})
		canvas.draw()
	}, 200)
	setTimeout(function() {
		canvas.set('explosion', {
			elId: 'expl-3'
		})
		canvas.draw()
	}, 400)
	setTimeout(function() {
		showScreen()
	}, 600)
}

function showScreen() {
	var container = document.getElementById('canvas-container')
	container.innerHTML = ''

	var splash = document.getElementById('splash')
	splash.style['background-color'] = 'black'

	var theScore = document.createElement('p')
	theScore.innerHTML = 'GAME OVER<br/><br/>' 
		+ 'Your score: ' + window.config.score.points + '<br/><br/>'
	var top = window.config.gameH * 0.3
	theScore.style['margin-top'] = top + 'px'
	theScore.id = 'game-over-score'
	splash.appendChild(theScore)

	var btn = document.createElement('button')
	btn.id = 'game-over-btn'
	btn.innerHTML = 'Play again'
	splash.appendChild(btn)

	btn.onclick = function() { window.location.reload() }
}

},{"./canvas":4}],7:[function(require,module,exports){
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


},{"./canvas-add-base":1,"./canvas-add-coins":2,"./canvas-add-objects":3,"./render":14,"./resize":15}],8:[function(require,module,exports){
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



},{"../canvas":4}],9:[function(require,module,exports){
var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['car-1', 'car-2', 'car-3', 'car-4', 'car-5']
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



},{"../canvas":4}],10:[function(require,module,exports){
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

},{"../canvas":4}],11:[function(require,module,exports){
var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['scooter-1', 'scooter-2', 'scooter-3']
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

},{"../canvas":4}],12:[function(require,module,exports){
var canvas = require('../canvas')

module.exports = function(id) {
	var imgs = ['side-1', 'side-2', 'side-3']
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

},{"../canvas":4}],13:[function(require,module,exports){
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

},{"../canvas":4}],14:[function(require,module,exports){
var canvas = require('./canvas')
var collision = require('./collision')

module.exports = function() {
	collision.initRisk()
	var objs = window.config.objs
	moveLoop(0, objs, function() {
		collision.risks()
		collision.coins()
		orderObjs(function() {
			canvas.draw()
		})
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
		} else if(o.cl === 'coin-life') {
			var newY = oldY + (window.config.gameH / 100) * 1
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkCoin(newY, 1, o.lane, o.id, 'life')
			}
		} else if(o.cl === 'coin-cash') {
			var newY = oldY + (window.config.gameH / 100) * 1
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
				checkCoin(newY, 1, o.lane, o.id, 'cash')
			}
		} else if(o.id === 'score-text') {
			canvas.set('score-text', { text: window.config.score.points.toString() })
		} else if(o.id.substring(0, 11) === 'score-life-') {
			var index = +o.id.substring(11) + 1
			if(window.config.score.life < index) { canvas.set(o.id, { opacity: 0.2 }) }
			else { canvas.set(o.id, { opacity: 0.8 })  }
		} else if(o.id === 'bike') {
			if(window.config.bikeImg.nb === 1) {
				if(window.config.bikeImg.red === true) {
					canvas.set('bike', {elId: 'bike-1-red'})
				} else {
					canvas.set('bike', {elId: 'bike-1'})
				}  
			} else { 
				if(window.config.bikeImg.red === true) {
					canvas.set('bike', {elId: 'bike-2-red'})
				} else {
					canvas.set('bike', {elId: 'bike-2'})
				}   
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

function checkCoin(y, h, lane, id, type) {
	var laneWidth = window.config.laneWidth
	var riskStart = window.config.gameH / 2 + laneWidth * 1
	var riskEnd = window.config.gameH / 2 + laneWidth * 2
	if(y > riskStart - laneWidth * h && y < riskEnd) {
		collision.addCoin(lane, id, type)
	}
}

function orderObjs(callback) {
	var objs = window.config.objs
	var layer1 = []
	var layer2 = []
	var layer3 = []
	for(i=0;i<objs.length;i++) {
		var cl = objs[i].cl
		if(cl === 'deco' || cl === 'coin-cash' || cl === 'coin-life') { layer1.push(objs[i]) }
		else if(cl === 'score' || cl === 'bike') { layer3.push(objs[i]) }
		else { layer2.push(objs[i]) }
	}
	var newObjs = []
	for(i=0;i<layer1.length;i++) { newObjs.push(layer1[i]) }
	for(i=0;i<layer2.length;i++) { newObjs.push(layer2[i]) }
	for(i=0;i<layer3.length;i++) { newObjs.push(layer3[i]) }
	
	window.config.objs = newObjs

	callback()
}

},{"./canvas":4,"./collision":5}],15:[function(require,module,exports){
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

		var splash = document.getElementById('splash')
		splash.style.left = x + 'px'
		splash.style.width = w + 'px'
		splash.style.height = h + 'px'

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
		canvas.set('score-rect', {
			width: w,
			height: window.config.laneWidth
		})
		canvas.set('score-text', {
			x: window.config.laneWidth * 0.2,
			y: window.config.laneWidth * 0.8,
			fontSize: window.config.laneWidth * 0.8
		})
		canvas.set('score-life-0', {
			x: window.config.laneWidth * 9,
			width: window.config.laneWidth,
			height: window.config.laneWidth
		})
		canvas.set('score-life-1', {
			x: window.config.laneWidth * 10,
			width: window.config.laneWidth,
			height: window.config.laneWidth 
		})
		canvas.set('score-life-2', {
			x: window.config.laneWidth * 11,
			width: window.config.laneWidth,
			height: window.config.laneWidth
		})
		canvas.set('score-life-3', {
			x: window.config.laneWidth * 12,
			width: window.config.laneWidth,
			height: window.config.laneWidth
		})
		canvas.set('score-life-4', {
			x: window.config.laneWidth * 13,
			width: window.config.laneWidth,
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

},{"./canvas":4}],16:[function(require,module,exports){
var game = require('./lib/game')

window.onload = function() {

	getSize(function(w, h) {
		var gameScreen = document.getElementById('game')
		gameScreen.style.width = w + 'px'
		gameScreen.style.height = h + 'px'

		var img = document.createElement('img')
		img.src = 'img/splash.png'
		img.id = 'splash-screen'
		img.style.width = w + 'px'
		img.style.height = h + 'px'

		var splash = document.getElementById('splash')
		splash.style.width = w + 'px'
		splash.style.height = h + 'px'
		splash.appendChild(img)

		img.onclick = function() {
			document.getElementById('swipe-cursor').style['background-color'] = 'black'
			splash.removeChild(img)
			resetConfig(function() {
				game()
			})
		}
	})
}

function resetConfig(callback) {
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
		},
		bikeImg: {
			nb: 1,
			red: false
		}
	}
	callback()
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
	callback(width, height)
}

},{"./lib/game":7}]},{},[16]);

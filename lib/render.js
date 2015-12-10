var canvas = require('./canvas')
var collision = require('./collision')

module.exports = function() {
	collision.initRisk()
	var objs = window.config.objs
	moveLoop(0, objs, function() {
		collision.risks()
		collision.coins()
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


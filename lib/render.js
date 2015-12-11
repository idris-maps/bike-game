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

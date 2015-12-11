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



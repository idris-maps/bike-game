var canvas = require('./canvas')

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
		canvas.set('bike', { elId: 'bike-red' })
		setTimeout(function() {
			canvas.set('bike', { elId: 'bike' })		
		}, 500)
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
		if(coin.type === 'cash') { console.log('cash') }
		else { console.log('life') }
	}
}

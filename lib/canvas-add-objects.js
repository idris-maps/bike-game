var canvas = require('./canvas')
var carRight = require('./objects/car-right')
var scooterRight = require('./objects/scooter-right')
var carLeft = require('./objects/car-left')
var scooterLeft = require('./objects/scooter-left')

module.exports = function() {

	var nb = window.config.speed.nb
	var interval = 3000/nb

	for(i=0;i<nb;i++) {
			setTimeout(function() {
				addRandomObject()
			}, interval * i)
	}
}

function addRandomObject() {
	var possible = ['car-right', 'scooter-right', 'car-left', 'scooter-left', 'scooter-right', 'car-left', 'scooter-left']
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
	if(object === 'car-left') { carLeft(id) }
	if(object === 'scooter-left') { scooterLeft(id) }
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

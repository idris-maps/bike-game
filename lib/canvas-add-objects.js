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

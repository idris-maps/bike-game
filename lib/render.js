var canvas = require('./canvas')

module.exports = function() {
	var objs = window.config.objs
	moveLoop(0, objs, function() {
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
			} 
		} else if(o.cl === 'car-left') {
			var newY = oldY + (window.config.gameH / 100) * 2.5
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
			} 		
		} else if(o.cl === 'scooter-right') {
			var newY = oldY - (window.config.gameH / 100) * 1
			if(newY < 0 - window.config.laneWidth * 3) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
			}	
		} else if(o.cl === 'scooter-left') {
			var newY = oldY + (window.config.gameH / 100) * 4
			if(newY > window.config.gameH) {
				canvas.remove(id)
			} else {
				canvas.set(id, {y: newY})
			} 
		}
		count = count + 1
		moveLoop(count, objs, callback)
	}
}


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

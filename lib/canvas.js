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

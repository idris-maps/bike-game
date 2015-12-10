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
		elId: 'bike',
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

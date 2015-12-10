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
/*
	canvas.add({
		id: 'text',
		type: 'text',
		cl: 'text',
		text: 'hello',
		fontFamily: 'Comic Sans MS',
		fontSize: 30,
		x: 50,
		y: 50,
		fill: 'red'
	})
*/
}

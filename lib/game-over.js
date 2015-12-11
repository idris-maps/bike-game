var canvas = require('./canvas')

module.exports = function() {
	for(i=0;i<window.config.intervals.length;i++) {
		clearInterval(window.config.intervals[i])
	}

	var w = window.config.laneWidth * 5
	var x = window.config.x - w/2
	var y = window.config.gameH / 2 + window.config.laneWidth * 1.5 - w/2
	canvas.add({
		id: 'explosion',
		cl: 'gameover',
		type: 'rect',
		x: x,
		y: y,
		width: w,
		height: w,
		fill: 'yellow'
	})
	canvas.draw()
	setTimeout(function() {
		canvas.set('explosion', {
			fill: 'orange'
		})
		canvas.draw()
	}, 300)
	setTimeout(function() {
		canvas.set('explosion', {
			fill: 'red'
		})
		canvas.draw()
	}, 600)
	setTimeout(function() {
		showScreen()
	}, 900)
}

function showScreen() {
	var container = document.getElementById('canvas-container')
	container.innerHTML = ''

	var splash = document.getElementById('splash')
	splash.style['background-color'] = 'black'

	var theScore = document.createElement('p')
	theScore.innerHTML = 'GAME OVER<br/><br/>' 
		+ 'Your score: ' + window.config.score.points + '<br/><br/>'
	var top = window.config.gameH * 0.3
	theScore.style['margin-top'] = top + 'px'
	theScore.id = 'game-over-score'
	splash.appendChild(theScore)

	var btn = document.createElement('button')
	btn.id = 'game-over-btn'
	btn.innerHTML = 'Play again'
	splash.appendChild(btn)

	btn.onclick = function() { window.location.reload() }
}

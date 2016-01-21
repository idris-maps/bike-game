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
		type: 'image',
		elId: 'expl-1',
		x: x,
		y: y,
		width: w,
		height: w,
		fill: 'yellow'
	})
	canvas.draw()
	setTimeout(function() {
		canvas.set('explosion', {
			elId: 'expl-2'
		})
		canvas.draw()
	}, 200)
	setTimeout(function() {
		canvas.set('explosion', {
			elId: 'expl-3'
		})
		canvas.draw()
	}, 400)
	setTimeout(function() {
		showScreen()
	}, 600)
}

function showScreen() {
	var container = document.getElementById('canvas-container')
	container.innerHTML = ''

	var splash = document.getElementById('splash')
	splash.style['background-color'] = 'black'

	var w = splash.offsetWidth
	var h = splash.offsetHeight
	var scoreH = h/16*12
	var fontSize = w/40

	var goScreen = document.createElement('img')
	goScreen.style.width = w + 'px'
	goScreen.style.height = h + 'px'
	goScreen.src = 'img/game-over.png'
	splash.appendChild(goScreen)

	var theScore = document.createElement('p')
	theScore.innerHTML = window.config.score.points
	theScore.style['font-size'] = fontSize
	theScore.style.width = '100%'
	theScore.style['text-align'] = 'center'
	theScore.style.position = 'absolute'
	theScore.style.top = scoreH + 'px'
	theScore.style.color = 'white'
	splash.appendChild(theScore)
	
/*
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
*/

	goScreen.onclick = function() { window.location.reload() }
}

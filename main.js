var game = require('./lib/game')

window.onload = function() {
	var cursor = document.getElementById('swipe-cursor')
	cursor.style.opacity = 0
	getSize(function(w, h) {
		var gameScreen = document.getElementById('game')
		gameScreen.style.width = w + 'px'
		gameScreen.style.height = h + 'px'

		var img = document.createElement('img')
		img.src = 'img/splash.png'
		img.id = 'splash-screen'
		img.style.width = w + 'px'
		img.style.height = h + 'px'

		var splash = document.getElementById('splash')
		splash.style.width = w + 'px'
		splash.style.height = h + 'px'
		splash.appendChild(img)

		img.onclick = function() {
			var cursor = document.getElementById('swipe-cursor')
			cursor.style.opacity = 0.5
			splash.removeChild(img)
			resetConfig(function() {
				game()
			})
		}
	})
}

function resetConfig(callback) {
	window.config = {
		objs: [],
		count: 0,
		speed: {
			nb: 2,
			add: 3000
		},
		score: {
			points: 0,
			life: 5,
			boom: false
		},
		bikeImg: {
			nb: 1,
			red: false
		}
	}
	callback()
}

function getSize(callback) {
	var windowWidth = window.innerWidth
	var windowHeight = window.innerHeight
	if(windowWidth < windowHeight) {
		var height = windowHeight
		var width = windowHeight / 16 * 9
	} else {
		var height = windowHeight
		var width = windowHeight / 16 * 9		
	}
	callback(width, height)
}


// SELECTORS 
const serviceBtn = document.querySelector('.service-btn .button');
const serviceMore = document.querySelector('.services-container');

// GLOBAL VARS
var expanded = false; 


serviceBtn.addEventListener('click', () => {
    console.log("Working");
    if(!expanded) {
		serviceMore.classList.remove('close');
        serviceMore.classList.add('active');
        expanded = true;
        serviceBtn.innerHTML = "Close <i class=\"fas fa-arrow-up\"></i>";
    }
    else {
		serviceMore.classList.add('close');
		setTimeout(() => serviceMore.classList.remove('active'), 100);
        expanded = false;
        serviceBtn.innerHTML = "More";
    }
});


/* MAIN LANDING PAGE BACKGROUND */

var canvas = document.createElement('canvas');
document.querySelector('.slider-cont.parallax-background.bg1 .overlay').appendChild(canvas);
canvas.width = window.innerWidth, canvas.height = window.innerHeight;
canvas.style.background = "rgba(0, 0, 0, 1)";

var ctx = canvas.getContext('2d');

const colors = ['#D9EAF9','#32B7F4', '#2E49E0', '#182098'];

var Star = function (x,y,circle_rad,size,color) {
	this.radians = Math.random() * (Math.PI *2);

	this.x = x + Math.cos(this.radians) * circle_rad;
	this.y = y + Math.sin(this.radians) * circle_rad;

	this.circle_rad = circle_rad;
	this.color = color;
	this.size = size;

	this.last = {x:x, y : y}
	this.alpha = 0, this.temp = 0;
	this.update = () => {
		const lastPos = {x:this.x, y:this.y}

		if(this.temp > 1) {
			this.alpha -= 0.008;
		} else {
			this.temp += 0.008;
			this.alpha += 0.008;
		}

		if(this.alpha <= 0) this.alpha =0

		this.radians += Math.random() * 0.04;	
		this.x = this.last.x + Math.cos(this.radians) * this.circle_rad;
		this.y = this.last.y + Math.sin(this.radians) * this.circle_rad;

		this.draw(lastPos);
	}

	this.draw = (lastPos) => {
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.size;
		ctx.moveTo(lastPos.x, lastPos.y);
		ctx.lineTo(this.x, this.y );
		ctx.globalAlpha = this.alpha
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}

function Group (x, y, num) {
	this.stars = [];
	var moreRand = minMax(100, canvas.width);
	for(var i = 0; i < num; i++) {
		this.stars.push(new Star(x,y,Math.random() * moreRand,Math.random() *5,getRandomColor()));
	}
	this.update = function () {
		this.stars.forEach((star) =>{
			star.update();
		});
	}
}

function getRandomColor() {
	var x = parseInt(Math.random() * (colors.length));
	return colors[x]
}

function minMax (min, max) {
	return Math.floor( Math.random () * (max - min + 1)) + min;
}

var g = [];
var added = [];
function init() {
	let i = 0;
	g.push(new Group(canvas.width/2, canvas.height/2, 100));	
	var ee = setInterval(function () {
		var posX = Math.random() * canvas.width;
		var posY = Math.random() * canvas.height;
		g.push(new Group(posX, posY, 100));		
		if(g.length > 4) {
			g.splice(0,1);
		}
	},1500)
}

function animate() {
	requestAnimationFrame(animate);
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'rgba(0, 0, 0,0.05)'
	ctx.fillRect(0,0,canvas.width, canvas.height);
	g.forEach(function(s) {
		s.update();	
	})
	added.forEach(function(s) {
		s.update();	
	})
}

init();
animate();

addEventListener('mousedown', function (e) {
	var posX = Math.random() * canvas.width;
	var posY = Math.random() * canvas.height;
	added.push(new Group(e.clientX, e.clientY, 100));
});
addEventListener('resize', function () {
	g.forEach(function (s) {
		s.stars = [];
	})
	g = [];
	added = [];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
})
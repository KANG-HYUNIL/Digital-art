var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = 600;
var height = 480;

var backgroundColor = '#5160e8';
var playerColor = '#8e99f9';
var playerR = 142;
var playerG = 153;
var playerB = 249;
var ballColor = '#ffd91e';

var pauseLoop = false;
var slowMo = false;

var balls = [];
var ballAmount = 50;

var loses = 0;
var score = 0;
var maxScore = 0;

var playerSize = 7;
var playerStartingPosition = 200;
var playerMaxAcceleration = .8;
var playerFriction = .9;

var ballMinSize = 4;
var ballMaxSize = 8;

var ballMinSpeed = 4;
var ballMaxSpeed = 8;

var inputLeft = false;
var inputRight = false;
var inputTop = false;
var inputBottom = false;

canvas.width = width;
canvas.height = height;

function random() {
	if(arguments.length === 0){
		return Math.random();
	}else{
		if(typeof arguments[0] == 'object'){
			return arguments[0][Math.floor(Math.random() * arguments[0].length)];
		}else{
			var minimum = (arguments.length === 1) ? 0 : arguments[0];
			var maximum = (arguments.length === 1) ? arguments[0] : arguments[1];

			return Math.floor(Math.random()*(maximum-minimum+1)+minimum);
		}
	}
}

function randomFloat(minimum, maximum){
  return Math.random()*(maximum-minimum+1)+minimum;
}

function rect(x,y,w,h){
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
}

function circle(x,y,radius){
  ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.closePath();
}

function fill(c){
  if(c){
    ctx.fillStyle = c;
  }else{
    ctx.fill();
  }  
}

function clearCanvas(){
  fill(backgroundColor);
  rect(0,0,width,height);
  fill();
}

function Vector(x, y){
  this.x = x || 0;
  this.y = y || 0;
  
  this.add = function(v){
    this.x += v.x;
    this.y += v.y;
  }
  
  this.mult = function(v){
    if(typeof v == 'object'){
      this.x *= v.x;
      this.y *= v.y;
    }else{
      this.x *= v;
      this.y *= v;
    }    
  }
  
  this.div = function(v){
    if(typeof v == 'object'){
      this.x /= v.x;
      this.y /= v.y;
    }else{
      this.x /= v;
      this.y /= v;
    }    
  }
  
  this.copy = function(){
    return new Vector(this.x, this.y);
  }
  
  this.sub = function(v){
    this.x -= v.x;
    this.y -= v.y;
  }  
  
  this.getMagnitude = function(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	this.getAngle = function() {
		return Math.atan2(this.y, this.x) * 180 / PI;
	}
}

//==================== BALL ====================//

function Ball(){
  this.move = true;
  this.size = random(ballMinSize, ballMaxSize);
  this.pos = new Vector(width + random(0, width), random(height));
  this.speed = new Vector(randomFloat(-ballMinSpeed, -ballMaxSpeed), 0);
  
  this.update = function(){
    if(!this.move){
      this.speed.mult(0.9);
    } 
    
    this.pos.add(this.speed);
    
    if(this.pos.x < 0-this.size){
      this.pos.x = width + random(0, width);
      this.pos.y = random(height);
    }
    
    this.checkCollision();
  }
  
  this.checkCollision = function(){
  	if(!player.exploded){
  		var circle1 = {radius: this.size, x: this.pos.x, y: this.pos.y};
	    var circle2 = {radius: player.size, x: player.pos.x, y: player.pos.y};
	    
	    var dx = circle1.x - circle2.x;
	    var dy = circle1.y - circle2.y;
	    
	    var distance = Math.sqrt(dx * dx + dy * dy);
	    if(distance < circle1.radius + circle2.radius){
	      reset();
	      loses++;
	    }	
  	}    
  }
  
  this.draw = function(){
    fill(ballColor);
    circle(this.pos.x, this.pos.y, this.size);
    fill();
  }
}

//==================== PARTICLE ====================//

function Particle(pos, angle, speed, size, life, color, parent){
  this.pos = pos;
  this.angle = angle;
  this.speed = speed;
  this.color = {r: null, g: null, b: null, a: null};
  this.colorFunction = color;
  this.size = size;
  this.maxLife = life;
  this.life = 0;
  this.parent = parent;

  this.randomEmitter = function(){
  	return random(0, 255);
  }
  
  this.update = function(){
    this.life++;

    this.pos.x += this.speed * Math.cos(this.angle);
    this.pos.y += this.speed * Math.sin(this.angle);

    this.colorFunction();
  }
  
  this.draw = function(){
    fill('rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.color.a+')');
    circle(this.pos.x, this.pos.y, this.size);
    fill();
  }
}

//==================== PLAYER ====================//

function Player(){
  this.size = playerSize;
  this.pos = new Vector(playerStartingPosition, height/2);
  this.speed = new Vector();
  this.acceleration = playerMaxAcceleration;
  this.friction = playerFriction;
  this.exploded = false;
  this.particles = [];
  this.dying = false;
  
  this.explode = function(){
    if(!this.exploded){
      this.dying = true;
      this.exploded = true;
      for(var i = 0; i < 25; i++){
        var particle = new Particle(
          this.pos.copy(),
          randomFloat(0, 359),
          randomFloat(0.05, 0.15),
          random(1, 1.2),
          30,
       	  function(){
			this.color.a = (this.maxLife - this.life) * (1 / this.maxLife);
			this.color.r = playerR;
			this.color.g = playerG;
			this.color.b = playerB;
    	  },
          this
        );
        this.particles.push(particle);
      }
    }    
  }
  
  this.die = function(){
    if(this.dying){
      this.size*=0.9; 
    }
  }
  
  this.update = function(){
    if(inputRight){
      this.speed.add(new Vector(this.acceleration, 0));
    }else if (inputLeft){
      this.speed.add(new Vector(-this.acceleration, 0));
    }
    
    if(inputBottom){
      this.speed.add(new Vector(0, this.acceleration));
    }else if (inputTop){
      this.speed.add(new Vector(0, -this.acceleration));
    }
    
    this.speed.mult(this.friction);    
    this.pos.add(this.speed);
    
    if(this.pos.y < 0-this.size){
      this.pos.y = height;
    }else if (this.pos.y > height + this.size){
      this.pos.y = 0;
    }
    
    if(this.pos.x < 0-this.size){
      this.pos.x = width;
    }else if (this.pos.x > width + this.size){
      this.pos.x = 0;
    }
  }
  
  this.draw = function(){
    this.die();
    if(!this.dying){
	    for(var i = 0; i < 1; i++){
	    	var r1 = random(-100, 100);
	    	var particle = new Particle(
		      new Vector(this.pos.x + randomFloat(-3,3), this.pos.y + randomFloat(-2, 2)),
		      180 * (Math.PI / 180),
		      1, parseFloat(0.25, .75), 45,
		      function(){
			      this.color.a = (this.maxLife - this.life) * (1 / this.maxLife);
				  this.color.r = playerR + r1;
				  this.color.g = playerG + r1;
				  this.color.b = playerB + r1;
		      }, this);
		    this.particles.push(particle);	
	    }
    }
    
    for(var i = 0; i < this.particles.length; i++){
    	if(this.particles[i].life < this.particles[i].maxLife){
    		this.particles[i].update();
      		this.particles[i].draw();
    	}else{
    		this.particles.splice(this.particles.indexOf(this.particles[i]), 1);
    	}
    }
    
    fill('rgba('+playerR+', '+playerG+', '+playerB+', 1)');
    circle(this.pos.x, this.pos.y, this.size);
    fill();
  }  
}

function reset(){  
  player.explode();

  setTimeout(function(){
    slowMo = false;
  	player = new Player();

  	if(score > maxScore){
      maxScore = score;
    }
    score = 0;
    balls = [];
    start();
  
    player.pos.x = playerStartingPosition;
    player.pos.y = height/2;
  }, 750);
}

var player = new Player();

function start(){
  for(var i = 0; i < ballAmount; i++){
    var ball = new Ball();  
    balls.push(ball);
  }
}

function renderGUI(){
  document.querySelector('.loses').textContent = loses;
  document.querySelector('.score').textContent = score;
  document.querySelector('.maxScore').textContent = maxScore;
}

function toggleSlowMo(){
	if(!slowMo){
		slowMo = true;
		for(var i = 0; i < balls.length; i++){
			balls[i].speed = new Vector(randomFloat(-ballMinSpeed/2, -ballMaxSpeed/2), 0);
		}
	}else{
		slowMo = false;
		for(var i = 0; i < balls.length; i++){
			balls[i].speed = new Vector(randomFloat(-ballMinSpeed, -ballMaxSpeed), 0);
		}
	}
}

start();

function loop(){
  if(!pauseLoop){
    clearCanvas();
  
    player.update();
    player.draw();

    for(var i = 0; i < balls.length; i++){
      balls[i].update();
      balls[i].draw();
    }

    score++;
    renderGUI();

    requestAnimationFrame(loop); 
  }
}

loop();


//Keboard input function
window.addEventListener('keydown', function(e){
  if(e.which == 39){
    inputRight = true;
  }else if(e.which == 37){
    inputLeft = true;
  }
  
  if(e.which == 38){
    inputTop = true;
  }else if (e.which == 40){
    inputBottom = true;
  }
  
  if(e.which == 13){
    if(!pauseLoop){
      pauseLoop = true;  
    }else{
      pauseLoop = false;
      loop();
    }    
  }

  if(e.which == 220){
  	toggleSlowMo();
  }
});

window.addEventListener('keyup', function(e){
  if(e.which == 39){
    inputRight = false;
  }else if(e.which == 37){
    inputLeft = false;
  }
  
  if(e.which == 38){
    inputTop = false;
  }else if (e.which == 40){
    inputBottom = false;
  }
});
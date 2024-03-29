let imgmenino;
function preload() {
  imgmenino = loadImage('aaaaa.png'); 
  imgboy = loadImage('aaa.png') 
  imgfundo = loadImage('a.png')
}
function setup() {
  image(img, 0, 0);
}
var canvasWidth = 600;
var canvasHeight = 400;
var score = 0;
//player
var player = {
	color : "#FFF",
	x : 280,
	width : 40,
	y : 355,
	height: 40,
	draw : function(){
		image(imgmenino,this.x, this.y, this.width, this.height);
	}
}


//bullet
var bullets = [];
function Bullet(I){
	I.active = true;
	I.x = player.x + player.width/2;
	I.y = player.y +  player.height/2;
	I.width = 3;
	I.height = 6;
	I.yVelocity = 5;
	I.inBounds = function(){
		return I.x >= 0 && I.y >= 0 && I.x < canvasWidth - I.width && I.y < canvasHeight - I.height;
	}
	I.update = function(){
		I.active  = I.active && I.inBounds();
		I.y -= I.yVelocity;
	}
	I.draw = function(){
		rect(I.x, I.y, I.width, I.height);
	}
	return I;
}

//enemies
var enemies  = [];
function Enemy(I){
	I.active = true;
	I.x = Math.random() * canvasWidth;
	I.y = 0;
	I.width = 30;
	I.height = 30;
	I.yVelocity = 2;
	I.inBounds = function(){
		return I.x >= 0 && I.y >= 0 && I.x < canvasWidth - I.width && I.y < canvasHeight - I.height;
	}
	I.draw = function(){
image(imgboy,I.x, I.y, I.width, I.height);
	}
	I.update= function(){
		I.active = I.active && I.inBounds();
		I.y += I.yVelocity;
	}
	return I;
}


//collision function

function collision(enemy, bullet){
	return bullet.x + bullet.width >= enemy.x && bullet.x < enemy.x + enemy.width &&
			bullet.y + bullet.height >= enemy.y && bullet.y < enemy.y + enemy.height;
}
//canvas functions 
function setup(){
	createCanvas(canvasWidth, canvasHeight);
	noCursor();
}
function draw(){
	fill(255);
	clear();
	background(imgfundo);
	text("score : " + score, 10, 10);
	fill(player.color);
	if(keyIsDown(LEFT_ARROW)){
		if(player.x-5 >= 0)
			player.x -= 5;
		else
			player.x = 0;
	}
	if(keyIsDown(RIGHT_ARROW)){
		if(player.x + 5 <= canvasWidth-player.width)
			player.x += 5;
		else
			player.x = canvasWidth - player.width;
	}
	if(keyIsDown(32)){
		bullets.push(Bullet({}));
	}
	player.draw();


	bullets = bullets.filter(function(bullet){
		return bullet.active;
	});
	bullets.forEach(function(bullet){
		bullet.update();
		bullet.draw();
	});

	if(Math.random()<0.05){
		enemies.push(Enemy({}));
	}
	enemies = enemies.filter(function(enemy){
		return enemy.active;
	});
	enemies.forEach(function(enemy){
		enemy.update();
		enemy.draw();
	});

	bullets.forEach(function(bullet){
		enemies.forEach(function(enemy){
			if(collision(enemy, bullet)){
				enemy.active = false;
				bullet.active = false;
				score++;
			}
		});
	});

	enemies.forEach(function(enemy){
		if(collision(enemy, player)){
			enemy.active = false;
			noLoop();
            fill(255, 0, 0)
			textSize(40);
			text("MENINO MALVADO", 180, 200);
		}
	});
}
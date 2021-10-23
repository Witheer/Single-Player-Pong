//Authors
//P1: Armando De La Torre

var currentSizeLeft;
var currentSizeRight;
var currentColor;


var playerOneY;
var playerTwoY;
var ballX;
var ballY;
var currentBallVelocityX;
var ballVelocityX;
var ballVelocityY;
var currentScore;
var highscore;






function setup() {

	frameRate(75);

	//setup for canvas and background
	createCanvas(600, 300);
	currentColor = random(0, 360);
	background(currentColor, 60, 80);

	//setup shapes stroke and color mode
	noStroke();
	colorMode(HSB, 360, 100, 100);

	//setup variables to default value
	currentSizeLeft = 200;
	currentSizeRight = 200;
	playerOneY = 0;
	playerTwoY = 0;
	ballX = 300;
	ballY = 150;
	ballVelocityX = 3;  
	currentBallVelocityX = random([-ballVelocityX, ballVelocityX]);
	ballVelocityY = 3;
	currentScore = 0;
	highscore = 0;
}

function draw() {

	background(currentColor, 60, 80);
	updateScore()
	updatePlayers();
	updateBall()

}


function updatePlayers() {

	// draw players
	fill(currentColor, 60, 100);
	rect(0, playerOneY, 20, currentSizeLeft);
	rect(580, playerTwoY, 20, currentSizeRight);



	//detect for player one input and move player one Y location
	if (keyIsDown(87)) {
		playerOneY -= 4;
	} else if (keyIsDown(83)) {
		playerOneY += 4;
	}

	if (playerOneY < 0) {
		playerOneY = 0
	} else if (playerOneY > 300 - currentSizeLeft) {
		playerOneY = 300 - currentSizeLeft;
	}



	//detect for player two input and move player two Y location
	if (keyIsDown(UP_ARROW)) {
		playerTwoY -= 4;
	} else if (keyIsDown(DOWN_ARROW)) {
		playerTwoY += 4;
	}

	if (playerTwoY < 0) {
		playerTwoY = 0
	} else if (playerTwoY > 300 - currentSizeRight) {
		playerTwoY = 300 - currentSizeRight;
	}
}

function updateBall() {

	// draws ball
	fill(currentColor, 60, 100);
	rect(ballX, ballY, 20, 20);



	//checks if ball is outside of game
	if (ballX <= -30 || ballX >= 610) {

		//RESETS GAME
		ballX = 310;
		ballY = 160
		currentSizeLeft = 200;
		currentSizeRight = 200;
		ballVelocityX = 3;
		currentBallVelocityX = random([-ballVelocityX, ballVelocityX]);
		currentColor = random(0, 360);
		background(currentColor, 60, 80);

		if (currentScore > highscore) {
			highscore = currentScore;
		}
		currentScore = 0;
	}

	

	//ball collition with players
	if (ballX >= 560 && ((ballY >= playerTwoY && ballY <= playerTwoY + currentSizeRight) || (ballY + 20 >= playerTwoY && ballY + 20 <= playerTwoY + currentSizeRight)) && ballX < 580) {
		ballVelocityX *= 1.05;
		currentBallVelocityX = -ballVelocityX;
		ballVelocityY *= random([-1, 1]);

		currentScore++;

		if (currentSizeRight <= 20) {
			currentSizeRight = 20;
		} else {
			currentSizeRight -= 20;
			playerTwoY += 10;
		}
	} else if (ballX <= 20 && ((ballY >= playerOneY && ballY <= playerOneY + currentSizeLeft) || (ballY + 20 >= playerOneY && ballY + 20 <= playerOneY + currentSizeLeft)) && ballX > 0) {
		ballVelocityX *= 1.05;
		currentBallVelocityX = ballVelocityX;
		ballVelocityY *= random([-1, 1]);

		currentScore++;

		if (currentSizeLeft <= 20) {
			currentSizeLeft = 20;
		} else {
			currentSizeLeft -= 20;
			playerOneY += 10;
		}
	}

	if (ballVelocityX > 12) {
		ballVelocityX = 12;
	} 

	//ball collition with top and bottom of screen
	if (ballY >= 280) {
		ballVelocityY *= -1;
	} else if (ballY <= 0) {
		ballVelocityY *= -1;
	}

	//moves ball x & y position
	ballX += currentBallVelocityX;
	ballY += ballVelocityY * (2 / 3);


}

function updateScore() {

	textSize(30);
	fill(currentColor, 40, 100);
	text("SCORE: " + currentScore, 360, 30);
	text("HIGH SCORE: " + highscore, 50, 30);
}



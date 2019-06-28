// Create a SCORE panel
let score = 0;
const span = document.createElement('span');
const div = document.createElement('div');
div.appendChild(span);
document.body.appendChild(div);
div.style.marginTop = '30px';
div.style.fontSize = '1.5rem';
span.textContent = 'Score: ' + score;

// Initializing the enemy positions
const enemyPosition = [59.5, 143.5, 228.5];

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = -101;
        this.y = enemyPosition[Math.floor(Math.random() * 3)];
        this.speed = Math.floor(Math.random() * 300) + 100;
    }
    this.checkCollision(player, this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collision, if so, reset the whole game
Enemy.prototype.checkCollision = function(a, b) {
    if (a.x < b.x + 90 &&
        a.x + 70 > b.x &&
        a.y < b.y + 45 &&
        a.y + 45 > b.y) {
        console.log('collision');
        gameReset();
        score = 0;
        span.textContent = 'Score: ' + score;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {};

// Load the player's image
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle keyboard inputs
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x = (this.x <= 0) ? 0 : this.x - 101;
        console.log(this.x);
    } else if (key === 'up') {
        this.y = this.y - 85;
    } else if (key === 'right') { 
        this.x = (this.x >= 404) ? 404 : this.x + 101;
    } else if (key === 'down') {
        this.y = (this.y >= 398) ? 398 : this.y + 85;
    }

    // Check for win
    if (this.y === -27) win();
};

// Move the player to his initial position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 398;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(202, 398, 45);
let allEnemies = [];

// Initializing the speed
function initializeSpeed() {
    return Math.floor(Math.random() * 300) + 100;
}

// Create a new enemy objects
allEnemies.push(
    new Enemy(-101, enemyPosition[Math.floor(Math.random() * 3)], initializeSpeed()),
    new Enemy(-101, enemyPosition[Math.floor(Math.random() * 3)], initializeSpeed()),
    new Enemy(-101, enemyPosition[Math.floor(Math.random() * 3)], initializeSpeed())
);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// If game won, update status; SCORE & Player Position
function win() {
    score++;
    span.textContent = 'Score: ' + score;
    player.reset();
}

// Resetting the game
function gameReset() {
    player.reset();
}

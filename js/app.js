var Character = function() {

};

//Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.generateInitialPosistion();
    this.speed = this.getSpeed();
    this.score = 0;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;

};
Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 600){
        this.generateNewEnemyPosition();
    }
};

// Generate every enemy's initial position
Enemy.prototype.generateInitialPosistion = function() {
    this.x = 300 * Math.random();
    this.y = Math.random() * (300 - 100) + 100;
    this.speed = this.getSpeed();
};

// Generate new enemy's initial position after old one is off the screen
Enemy.prototype.generateNewEnemyPosition = function () {
    this.x = 0;
    this.y = Math.random() * (270 - 100) + 100;
    this.speed = this.getSpeed();
};

// Get speed for enemy
Enemy.prototype.getSpeed = function(){
    return 400 * Math.random(80 - 30) + 30;
};

// Check enemy's collision
Enemy.prototype.attackedPlayerSuccessfully = function() {
    if (this.y + 80 > player.y && this.y < player.y + 90 && this.x + 80 > player.x && this.x < player.x + 90) {
        return true;
    }
    return false;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/pikachu.png';
    this.y = 460;
    this.x = 210;
    this.survive = true;
    this.score = 0;
};

Player.prototype = Object.create(Character.prototype);

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    if (! this.survive) {
        this.lose();
        game.addEnemyScore();
        game.start = false;
        $('#losing-game').modal('show');
    }
};

// Control player's movement
// Parameter: inputKeyCode, your keyboard input
Player.prototype.handleInput = function (inputKeyCode) {
    switch(inputKeyCode){
        case 'left':
        if (this.x - TILE_WIDTH >= MIN_BORDER_X) {
            this.x = this.x - TILE_WIDTH;
        }
        break;
        case 'up':
        if (this.y - TILE_HEIGHT > MIN_BORDER_Y) {
            this.y = this.y - TILE_HEIGHT;
        } else if (this.reachedTheGoal()) {
            this.win();
            game.addPlayerScore();
            game.start = false;
            $('#winning-game').modal('show');
        }
        break;
        case 'right':
        if (this.x + TILE_WIDTH < MAX_BORDER_X) {
            this.x = this.x + TILE_WIDTH;
        }
        break;
        case 'down':
        if (this.y + TILE_HEIGHT < MAX_BORDER_Y) {
            this.y = this.y + TILE_HEIGHT;
        }
        break;
    }
};

// Reset player to initial position
Player.prototype.reset = function () {
    this.y = 460;
    this.x = 210;
    this.survive = true;
};

// Player reached the target
Player.prototype.reachedTheGoal = function() {
    if (this.x > princess.x - 20 && this.x < princess.x + 20 && this.y < 150) {
        return true;
    }
    return false;
};

Player.prototype.win = function() {
    this.reset();
    clock.resetGame();
};



Player.prototype.lose = function() {
    this.reset();
    clock.resetGame();
};

Player.prototype.timeout = function() {
    // allEnemies.forEach(function(enemy) {
    //     enemy.score++;
    //     enemy.generateInitialPosistion();
    // });
    // document.getElementById("enemy-score").innerHTML = allEnemies[0].score;
    this.reset();
    clock.resetGame();
};

// Player's target
var BatteleTarget = function () {
    this.x = 210;
    this.y = 45;
    this.sprite = "images/snorlax.png";
};

BatteleTarget.prototype = Object.create(Character.prototype);

var Game = function() {
    this.start = false;
};

// Different game level generates differnt amount of enemy
Game.prototype.createEnemyBasedOnGameLevel = function(gameLevel) {
    switch(gameLevel) {
        case 'easy':
        allEnemies = [new Enemy('images/pidgey.png')];
        break;
        case 'nomal':
        allEnemies = [new Enemy('images/jigglypuff.png'), new Enemy('images/pidgey.png'), new Enemy('images/psyduck.png')];
        // console.log(allEnemies);
        break;
        case 'hard':
        allEnemies = [new Enemy('images/jigglypuff.png'), new Enemy('images/pidgey.png'), new Enemy('images/psyduck.png'), new Enemy('images/eevee.png'), new Enemy('images/charmander.png'),];
        break;
        case 'hell':
        allEnemies = [new Enemy('images/jigglypuff.png'), new Enemy('images/pidgey.png'), new Enemy('images/psyduck.png'), new Enemy('images/eevee.png'), new Enemy('images/charmander.png'), new Enemy('images/dratini.png'), new Enemy('images/mew.png'), new Enemy('images/abra.png')];
        break;
        
    }
};

Game.prototype.addPlayerScore = function() {
    player.score ++;
    document.getElementById("player-score").innerHTML = player.score;
}

Game.prototype.addEnemyScore = function() {
    allEnemies.forEach(function(enemy) {
        enemy.score++;
        enemy.generateInitialPosistion();
    });
    document.getElementById("enemy-score").innerHTML = allEnemies[0].score;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// var allEnemies = [new Enemy('images/pidgey.png')];
var allEnemies = [];
var player = new Player();
var princess = new BatteleTarget();
var game = new Game();

var TILE_WIDTH = 101,
    TILE_HEIGHT = 83,
    MIN_BORDER_X = 0,
    MAX_BORDER_X = 500,
    MIN_BORDER_Y = 100,
    MAX_BORDER_Y = 500;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    if(! $('.counter').is(':visible'))
    {
        return;
    }
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Preventn default browser action
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > - 1) {
        e.preventDefault();
    }
}, false);


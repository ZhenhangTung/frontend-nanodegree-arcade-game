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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.generateInitialPosistion = function() {
    this.x = 300 * Math.random();
    this.y = Math.random() * (300 - 100) + 100;
    this.speed = this.getSpeed();
};

Enemy.prototype.generateNewEnemyPosition = function () {
    this.x = 0;
    this.y = Math.random() * (300 - 100) + 100;
    this.speed = this.getSpeed();
};

Enemy.prototype.getSpeed = function(){
    return 400 * Math.random(80 - 30) + 30;
};

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

Player.prototype.update = function() {
    if (! player.survive) {
        player.lose();
        $('#losing-game').modal('show');
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (inputKeyCode) {
    switch(inputKeyCode){
        case 'left':
        if (this.x - 100 >= 0) {
            this.x = this.x - 100;
        }
        break;
        case 'up':
        if (this.y - 83 > 100) {
            this.y = this.y - 83;
        } else if (player.reachedTheGoal()) {
            player.win();
            $('#winning-game').modal('show');
        }
        break;
        case 'right':
        if (this.x + 100 < 500) {
            this.x = this.x + 100;
        }
        break;
        case 'down':
        if (this.y + 83 < 500) {
            this.y = this.y + 83;
        }
        break;
    }
};

Player.prototype.reset = function () {
    this.y = 460;
    this.x = 210;
    this.survive = true;
};

Player.prototype.reachedTheGoal = function() {
    if (player.x > princess.x - 20 && player.x < princess.x + 20 && player.y < 150) {
        return true;
    }
    return false;
};

Player.prototype.win = function() {
    player.score ++;
    document.getElementById("player-score").innerHTML = player.score;
    player.reset();
    clock.resetGame();
};

Player.prototype.lose = function() {
    allEnemies.forEach(function(enemy) {
        enemy.score++;
        enemy.generateInitialPosistion();
    });
    document.getElementById("enemy-score").innerHTML = allEnemies[0].score;
    player.reset();
    clock.resetGame();
};

Player.prototype.timeout = function() {
    allEnemies.forEach(function(enemy) {
        enemy.score++;
        enemy.generateInitialPosistion();
    });
    document.getElementById("enemy-score").innerHTML = allEnemies[0].score;
    player.reset();
    clock.resetGame();
};

var BatteleTarget = function () {
    this.x = 210;
    this.y = 45;
    this.sprite = "images/snorlax.png";
};

BatteleTarget.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// switch(gameLevel) {
//     case 'easy':
//     var allEnemies = [new Enemy('images/pidgey.png')];
//     break;
//     case 'nomal':
//     var allEnemies = [new Enemy('images/jigglypuff.png'), new Enemy('images/pidgey.png'), new Enemy('images/psyduck.png')];
//     break;
//     case 'hard':
//     var allEnemies = [new Enemy('images/jigglypuff.png'), new Enemy('images/pidgey.png'), new Enemy('images/psyduck.png'), new Enemy('images/eevee.png')];
//     break;
// }

var allEnemies = [new Enemy('images/pidgey.png')];
var player = new Player();
var princess = new BatteleTarget();



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


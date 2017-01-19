// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.generateInitialPosistion();
    this.speed = this.getSpeed();

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
    return 100 * Math.random(10 - 5) + 5;
};

Enemy.prototype.attackedPlayerSuccessfully = function() {
    if (this.y + 30 > player.y && this.y < player.y + 68 && this.x + 101 > player.x && this.x < player.x + 76) {
        return true;
    }
    return false;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.y = 460;
    this.x = 220;
    this.survive = true;
};

Player.prototype.update = function() {

    if (! player.survive) {
        alert('die');
        player.reset();
        player.survive = true;
    }

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // allEnemies.forEach(function(enemy, index, enemies) {
    //     if (enemy.attackedPlayerSuccessfully()) {
    //         alert('die');
    //         player.reset();
    //         player.survive = true;
    //     }
    // });

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
        } else {
            alert('success');
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
    this.x = 220;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player();




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

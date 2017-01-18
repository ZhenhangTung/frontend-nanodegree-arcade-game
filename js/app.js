// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 230 * Math.random();
    this.y = 230 * Math.random();
    this.speed = 100 * Math.random();

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
    // console.log(dt);
    this.x = this.x + this.speed * dt;
    // if (this.x > 600){
    //     this.x = 0;
    //    }
       // return;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getspeed = function(){
var random = Math.random() + .05;
if (Math.floor(random)< 1)
   {
     return 3;
   }
   else
   {
      return 6;
   }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.y = 400;
    this.x = 200;
};

// Player.prototype = Object.create(Enemy.prototype);
Player.prototype.update = function() {
    // this.y = 400;
    // this.x = 200;

};
Player.prototype.render = function() {
    console.log(this.x);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (inputKeyCode) {
    // switch(inputKeyCode) {
    //     case 'up':

    //     player.x = player.x + 100 * dt;
    //     player.render();
    //     console.log(player.x);
    // }
    // console.log(inputKeyCode);
    // if (this.x === 0 || this.x === 500 || this.y === 0 || this.y === 600) {
    //     return;
    // }
    switch(inputKeyCode){

        case 'left':
        if (this.x - 90 >= 0) {
            this.x = this.x - 90;
        }
        break;
        case 'up':
        if (this.y - 80 > -90) {
            this.y = this.y - 80;
        }
        console.log(this.y);
        break;
        case 'right':
        if (this.x + 90 < 500) {
            this.x = this.x + 90;
        }
        break;
        case 'down':
        if (this.y + 90 < 600) {
            this.y = this.y + 90;
        }
        break;

      }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
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

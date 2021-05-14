const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

//---------------Game constructor function
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

//initialize Game with Enemy and Player
Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    //prompt user for their name to become Player name
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructures name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // test the object creation
            console.log(this.currentEnemy, this.player + "!object creation");
            this.startNewBattle()
        });
};


module.exports = Game;
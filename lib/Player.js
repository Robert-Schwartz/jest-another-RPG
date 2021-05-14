const Potion = require('../lib/Potion');

//---------------Player Constructor function
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];
}

/* 
When using prototype, however, you are only creating the method once on the constructor itself. New player objects simply inherit the method from the constructor rather than having their own instances of that method. Such inheritance can traverse multiple levels, meaning if the method being called doesn't exist on Player(), JavaScript will look for it on the next constructor up the chain. In this case, the next constructor would be the built-in Object data type.
*/

//returns a string of health values as a prototype
Player.prototype.getHealth = function () {
    return `${this.name}'s health is now ${this.health}!`;
};

// returns an object with various player properties
Player.prototype.getStats = function () {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

// returns the inventory array or false if empty
Player.prototype.getInventory = function () {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};

//Player is alive or dead
Player.prototype.isAlive = function () {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// player heatlh status
Player.prototype.reduceHealth = function (health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
};

//Player Attack value method returns attack value (Num)
Player.prototype.getAttackValue = function () {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

//Add potion prototype to Player
Player.prototype.addPotion = function (potion) {
    this.inventory.push(potion);
};

//Player prototype for USE potion
Player.prototype.usePotion = function(index) {
    const potion = this.getInventory().splice(index, 1)[0];
    /* The .splice() method removes items from an array and returns the removed item(s) as a new array. Thus, two things are happening here: the original inventory array has a single Potion removed at the specified index value and put into a new "removed items" array, then the Potion at index [0] of this "removed items" array is saved in a potion variable.

    Both .push() and .splice() are methods on the Array prototype. This means that even built-in JavaScript data types are constructors themselves!*/

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'stength':
            this.strength += potion.value;
            break;
    }
};

//---------------- Export Player Object
module.exports = Player;
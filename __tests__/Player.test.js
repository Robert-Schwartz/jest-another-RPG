const { expect } = require('@jest/globals');
const Player = require('../lib/Player');
//require Potion constructor 
const Potion = require('../lib/Potion');
//mocks the constructor's implementation with our faked data
jest.mock('../lib/Potion');
/* Now if new Potion() is ever called within the test file itself or (more importantly) any of the subsequent modules attached to the test, the mocked data will be returned. */
console.log(new Potion());

//-----------------Test for a player object
test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

//-----------------Test for a player Stats object
//tests that player.getStats() returns an object with four specific properties.
test("gets player's stats as an object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

//--------------- Test for inventory content
test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

//--------------- Test Player health Value
test("gets player's health value", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
    /* The expect.stringContaining() method is an expect method that we can use to make sure our string includes our player's health. This is preferred in this case because we might need flexibility to change how the player's health will be displayed. This way, if that change happens, we won't need to update our test as well. */
});

//--------------- Test Player to be alive or not
test('checks if player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

//--------------- Test if the correct amount of health is being subtracted from the Player health property:
test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});
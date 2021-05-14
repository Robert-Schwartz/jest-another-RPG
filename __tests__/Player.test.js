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

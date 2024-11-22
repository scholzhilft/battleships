import { Ship } from '../src/ship.js';

describe('Ship', () => {

    let ship;

    beforeEach(() => {
        ship = new Ship(3);
    })

    test('creates Ship', () => {
        expect(typeof ship).toBe('object');
    });

    test('length gets set', () => {
        expect(ship.length).toBe(3);
    });

    test('hits increase', () => {
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(2);
    });

    test('isSunk works', () => {
        expect(ship.isSunk()).toBeFalsy;
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBeTruthy;
    });

    test('cant hit when sunk', () => {
        ship.hit();
        ship.hit();
        ship.hit();
        expect(() => ship.hit()).toThrow(Error);
    });
});



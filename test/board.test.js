import { Board } from '../src/board.js';
import { Ship } from '../src/ship.js';


describe('Board', () => {
    let board;
    let ship;

    beforeAll(() => {
        board = new Board(1);
        ship = new Ship(3);
        board.placeShip(ship);
    });
    
    test('create board', () => {
        expect(typeof board).toBe('object');
    });
    
    test('set ship on board', () => { 
        expect(ship.length).toBe(3);
        let ship2 = new Ship(3);
        board.placeShip(ship2);
        expect(ship2.coordinates.length).toBe(3);
    });

    test('board receives attack', () => { 
        board.receiveAttack('A5');
        expect(board.hits.includes('A5') || board.misses.includes('A5')).toBe(true);
    });

    test('isGameOver', () => {
        board.hits = [];
        expect(board.isGameOver()).toBeFalsy;
        Array(30).fill().forEach(() => board.hits.push('lul'));
        expect(board.isGameOver()).toBeTruthy;
        board.hits = [];
    })


})
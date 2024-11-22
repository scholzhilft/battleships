import { Board } from './board.js'

export class Player {
    constructor(num, type) {
        this.number = num;
        this.type = type;
        this.board = new Board(this);
    }    
}
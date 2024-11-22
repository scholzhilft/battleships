import { handleStartGameClick, handleAudioClick, handleGenerateGameClick, handleAttackClick } from './eventHandlers.js';
import { Player } from './player.js';
import { Board } from './board.js'

export class Game {    
    constructor() {
        this.displayStartScreen()
    }

    displayStartScreen() {
        const audio = document.getElementById('audio')
        const audio_icon = document.getElementById('audio-icon')
        const start = document.getElementById('start-container')
        const start_button = document.getElementById('start-button');
        const game = document.getElementById('game-container');
        const new_button = document.getElementById('new-game');


        start_button.addEventListener('click', () => handleStartGameClick(this, start, game, audio))
        new_button.addEventListener('click', () => handleStartGameClick(this, start, game, audio))
        audio_icon.addEventListener('click', () => handleAudioClick(audio_icon, audio))
    }

    startGame() {
        this.displayEmptyGameboard(1);
        this.displayEmptyGameboard(2);
        const generate = document.getElementById('generate')
        const gb1 = document.getElementById('gameBoard1');
        const gb2 = document.getElementById('gameBoard2');
        generate.addEventListener('click', () => handleGenerateGameClick(this, generate, gb1, gb2))
    }
    
    generateGame() {
        this.player1 = new Player(1, 'human');
        this.player2 = new Player(2, 'computer');
        this.displayGameboard(1, this.player1);
        this.board2 = new Board(this.player2);
        this.displayEmptyGameboard(2);
        const popup = document.getElementById('popup')
        popup.classList.remove('gone')
        popup.innerHTML = 'YOU BEGIN, SELECT SQUARE TO ATTACK';
    }

    displayEmptyGameboard(num) {
        const boardContainer = document.getElementById(`board${num}-container`);
        const boardElement = document.getElementById(`gameBoard${num}`);
        const boardLabel = document.getElementById(`label${num}`);

        (num === 1) ? boardLabel.innerHTML = 'YOUR BOARD' : boardLabel.innerHTML = "OPPONENTS' BOARD";
        boardContainer.appendChild(boardLabel);
        const tr1 = this.createFileLabels()
        boardElement.appendChild(tr1);

        for (let row = 1; row < 11; row++) {
            // create row label (1-10)
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerHTML = row;
            td1.style.border = 'white'
            tr.style.fontWeight = 'bold'
            tr.style.fontSize = '12px'
            tr.style.fontFamily = 'monospace'
            tr.appendChild(td1);
            for (let col = 0; col < 10; col++) {
                const td = document.createElement('td');
                td.style.backgroundColor = 'aliceblue';
                td.style.cursor = 'default';
                if (document.getElementById('generate').classList.contains('gone')) {
                    td.style.cursor = 'pointer';
                    td.addEventListener('click', () => handleAttackClick(this, td, row, col));
                }
                tr.appendChild(td);
            }
            boardElement.appendChild(tr);
        }
        boardContainer.appendChild(boardElement);
    }

    computerAttack() {
        const attackCoord = this.generateValidAttackCoord();
        this.player1.board.receiveAttack(attackCoord)
        document.getElementById('gameBoard1').innerHTML = '';
        this.displayGameboard(1, this.player1)
    }

    generateValidAttackCoord() {
        const attackCoord = String.fromCharCode(this.player1.board.getRandomInt(65,74)) + this.player1.board.getRandomInt(1,10);
        if (this.player1.board.hits.includes(attackCoord) || this.player1.board.misses.includes(attackCoord)) {
            return this.generateValidAttackCoord();
        } else {
            return attackCoord;
        }
    }
    
    displayGameboard(num) {
        const boardElement = document.getElementById(`gameBoard${num}`);
        const tr1 = this.createFileLabels();
        boardElement.appendChild(tr1);        

        for (let row = 1; row < 11; row++) {
            // create label (1-10)
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerHTML = row
            td1.style.border = 'white'
            tr.style.fontWeight = 'bold'
            tr.style.fontSize = '12px'
            tr.style.fontFamily = 'monospace'
            tr.appendChild(td1);

            for (let col = 0; col < 10; col++) {
                const td = document.createElement('td');
                td.style.backgroundColor = 'aliceblue'
                td.dataset.row = row;
                td.dataset.col = String.fromCharCode(65+col);                

                if (num == 1) {
                    this.player1.board.all_ship_coordinates.forEach((coord) => {
                        if (coord.substring(0,coord.length-3) == `${td.dataset.col}${td.dataset.row}`) {
                            if (coord[coord.length-3] == 5) {
                                td.style.backgroundColor = 'navy'
                            } else if (coord[coord.length-3] == 4) {
                                td.style.backgroundColor = 'maroon';
                            } else if (coord[coord.length-3] == 3) {                     
                                td.style.backgroundColor = 'darkolivegreen';
                            } else if (coord[coord.length-3] == 2) {
                                td.style.backgroundColor = 'darkgoldenrod';
                            }
                            if (coord[coord.length-1] == 1) { // if vertical (1)
                                if (coord[coord.length-2] == 'b') {
                                    td.style.borderWidth = '3px';
                                    td.style.borderBottomWidth = '0px'
                                } else if (coord[coord.length-2] == 'm') {
                                    td.style.borderWidth = '0px'
                                    td.style.borderLeftWidth = '3px';
                                    td.style.borderRightWidth = '3px';
                                } else {
                                    td.style.borderWidth = '3px';
                                    td.style.borderTopWidth = '0px'

                                }
                            } else {
                                if (coord[coord.length-2] == 'b') {
                                    td.style.borderWidth = '3px';
                                    td.style.borderRightWidth = '0px'
                                } else if (coord[coord.length-2] == 'm') {
                                    td.style.borderWidth = '0px'
                                    td.style.borderTopWidth = '3px';
                                    td.style.borderBottomWidth = '3px';

                                } else {
                                    td.style.borderWidth = '3px';
                                    td.style.borderLeftWidth = '0px'

                                }
                            }
                        }
                    })
                } 
                else {
                    this.player2.board.all_ship_coordinates.forEach((coord) => {
                        if (coord.substring(0,coord.length-3) == `${td.dataset.col}${td.dataset.row}`) {
                                if (coord[coord.length-3] == 5) {
                                    td.style.backgroundColor = 'blue'
                                } else if (coord[coord.length-3] == 4) {
                                    td.style.backgroundColor = 'red';
                                } else if (coord[coord.length-3] == 3) {                     
                                    td.style.backgroundColor = 'green';
                                } else if (coord[coord.length-3] == 2) {
                                    td.style.backgroundColor = 'orange';
                            }
                        }
                    })
                }

                if (this.player1.board.hits.includes(`${td.dataset.col}${td.dataset.row}`) || this.player1.board.misses.includes(`${td.dataset.col}${td.dataset.row}`)) {
                    td.style.fontSize = 'large'
                    if (this.player1.board.attacks[this.player1.board.attacks.length-1] == `${td.dataset.col}${td.dataset.row}`) {
                        let isVisible = true;
                        let interval = setInterval(() => {
                            td.innerHTML = isVisible ? 'X' : ''; 
                            isVisible = !isVisible;
                        }, 200); 
                        setTimeout(() => clearInterval(interval), 1000)
                    }
                    td.innerHTML = 'X'
                }
                
                td.style.cursor = 'default';
                tr.appendChild(td);
            }
            boardElement.appendChild(tr);
        }        
    }

    createFileLabels() {
        const tr1 = document.createElement('tr');        
        const tdhead0 = document.createElement('td');
        const tdhead1 = document.createElement('td');
        const tdhead2 = document.createElement('td');
        const tdhead3 = document.createElement('td');
        const tdhead4 = document.createElement('td');
        const tdhead5 = document.createElement('td');
        const tdhead6 = document.createElement('td');
        const tdhead7 = document.createElement('td');
        const tdhead8 = document.createElement('td');
        const tdhead9 = document.createElement('td');
        const tdhead10 = document.createElement('td');
        tdhead1.innerHTML = 'A'
        tdhead2.innerHTML = 'B'
        tdhead3.innerHTML = 'C'
        tdhead4.innerHTML = 'D'
        tdhead5.innerHTML = 'E'
        tdhead6.innerHTML = 'F'
        tdhead7.innerHTML = 'G'
        tdhead8.innerHTML = 'H'
        tdhead9.innerHTML = 'I'
        tdhead10.innerHTML = 'J'
        tdhead0.style.border = 'white'
        tdhead1.style.border = 'white'
        tdhead2.style.border = 'white'
        tdhead3.style.border = 'white'
        tdhead4.style.border = 'white'
        tdhead5.style.border = 'white'
        tdhead6.style.border = 'white'
        tdhead7.style.border = 'white'
        tdhead8.style.border = 'white'
        tdhead9.style.border = 'white'
        tdhead10.style.border = 'white'
        tr1.appendChild(tdhead0);
        tr1.appendChild(tdhead1);
        tr1.appendChild(tdhead2);
        tr1.appendChild(tdhead3);
        tr1.appendChild(tdhead4);
        tr1.appendChild(tdhead5);
        tr1.appendChild(tdhead6);
        tr1.appendChild(tdhead7);
        tr1.appendChild(tdhead8);
        tr1.appendChild(tdhead9);
        tr1.appendChild(tdhead10);
        tr1.style.fontWeight = 'bold'
        tr1.style.fontSize = '12px'
        tr1.style.fontFamily = 'monospace'

        return tr1;
    }
}

let game1 = new Game();
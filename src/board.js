import { Ship } from './ship.js'

export class Board {
    constructor(player) {
        this.player = player;       
        this.all_ship_coordinates = []; 
        this.ships = [];
        this.attacks = []
        this.hits = [];
        this.misses = [];
        this.placeShips(player)
    }

    placeShips(player) {
        let ships = this.createShips([5, 4, 4, 3, 3, 3, 2, 2, 2, 2]);
        
        ships.forEach((ship) => {
            this.placeShip(ship);
        });        
    }

    createShips(shipTypes) {
        let ships = []
        shipTypes.forEach((type) => { 
            ships.push(new Ship(type)); 
        });
        return ships;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    placeShip(ship) { 
        let validPlacement = false;
        while (!validPlacement) {
            let startCoordinates = this.generateStartCoordinates(ship);
            let shipCoordinates = [];
    
            outerLoop: 
            for (let i = 0; i < ship.length; i++) {
                let currCoords;

                if (startCoordinates[1]) { // if vertical (1), increase row
                    currCoords = startCoordinates[0][0] + (parseInt(startCoordinates[0][1]) + 1 + i);
                } else {
                    currCoords = String.fromCharCode(startCoordinates[0][0].charCodeAt(0) + i) + (parseInt(startCoordinates[0][1]) + 1); //bc startCoordinates[0][1] only returns single char, but we want the 10th row as well
                }

                for (let j = 0; j < this.all_ship_coordinates.length; j++) {
                    const coord = this.all_ship_coordinates[j];
                    if (coord.substring(0, coord.length - 1).includes(currCoords)) {
                        break outerLoop; // If there's an overlap, break out of the loop
                    }
                }

                if (i == 0) {
                    shipCoordinates.push(currCoords+ship.length+'b'+startCoordinates[1]);
                } else if (i == ship.length - 1) {
                    shipCoordinates.push(currCoords+ship.length+'e'+startCoordinates[1]);
                } else {
                    shipCoordinates.push(currCoords+ship.length+'m'+startCoordinates[1]);
                }
            }

            if (shipCoordinates.length === ship.length) {
                validPlacement = true;
                ship.coordinates = shipCoordinates;
                this.all_ship_coordinates.push(...shipCoordinates);
                this.ships.push(ship);
            }
        }
    }

    generateStartCoordinates(ship) {
        let coordinates = [`${String.fromCharCode(this.getRandomInt(65,74))}${this.getRandomInt(0,9)}`,this.getRandomInt(0,1)];
        
        if (coordinates[1]) {  // if vertical (1) => check for row
            if ((coordinates[0][1] == 9) || ((ship.length > 2 && coordinates[0][1] == 8) || (ship.length > 3 && coordinates[0][1] == 7) || (ship.length > 4 && coordinates[0][1] == 6)) || (this.all_ship_coordinates.includes(coordinates[0]))) {
                return this.generateStartCoordinates(ship);
            } else {
                return coordinates;
            }
        } else { // if horizotal (0) => check for file
            if ((coordinates[0][0] == 'J') || (ship.length > 2 && coordinates[0][0] == 'I') || (ship.length > 3 && coordinates[0][0] == 'H') || (ship.length > 4 && coordinates[0][0] == 'G') || (this.all_ship_coordinates.includes(coordinates[0]))) {
                return this.generateStartCoordinates(ship);
            } else {    
                return coordinates;
            }
        }        
    }

    receiveAttack(clickedCoord) {
        this.attacks.push(clickedCoord);
        if (this.all_ship_coordinates.map(coord => coord.substring(0,coord.length-3)).includes(clickedCoord)) {
            this.hits.push(clickedCoord);
            let ship = this.ships.find(ship => ship.coordinates.map(coord => coord.substring(0,coord.length-3)).includes(clickedCoord));
            ship.hit();
            return true;
        } else {
            this.misses.push(clickedCoord);
            return false;
        }
    }

    isGameOver() {
        return this.hits.length == 30;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// 1. controlle ob valid input (1-9) && (A-I) u length 2-5
// if len>2 && ==9 o. ==I
// if len>3 && >7 o. >G
// if len>4 && >6 o. >F
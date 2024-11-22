export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.coordinates = [];
    }

    hit() {
        if (this.hits != this.length) {
            if (this.hits == this.length - 1) {
                const shipMessages = {
                    5: 'Carrier sunk!',
                    4: 'Battleship sunk!',
                    3: 'Destroyer sunk!',
                    2: 'Patrol Boat sunk!'
                };
                popup.innerHTML = shipMessages[this.length];
            }
            
            this.hits++;
        }
    }

    isSunk() {
       return this.hits == this.length;
    }
}
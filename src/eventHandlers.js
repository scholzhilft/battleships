export const handleStartGameClick = (game, start, gameDisplay, audio) => {
    start.classList.add('gone');
    gameDisplay.classList.remove('gone');
    document.getElementById('generate').classList.remove('gone')
    document.getElementById('new-game').classList.add('gone');
    document.getElementById('gameBoard1').innerHTML = '';
    document.getElementById('gameBoard2').innerHTML = '';

    game.startGame();
    audio.muted = true;
}

export const handleGenerateGameClick = (game, generate, gb1, gb2) => {
    generate.classList.add('gone')
    gb1.innerHTML = '';
    gb2.innerHTML = '';

    game.generateGame();
    document.getElementById('label1').innerHTML = '';
    document.getElementById('label2').innerHTML = '';  
}

export const handleAudioClick = (audio_button, audio) => {
    if (audio.muted) {
        audio.muted = false;
        audio_button.innerHTML = '🔊'
    } else {
        audio.muted = true;
        console.log(audio.muted)
        audio_button.innerHTML =  '🔇'
    }
}

export const handleAttackClick = (game, td, row, col) => {
    col = String.fromCharCode(65 + col)
    const clickedCoord = col+row
    // cloning the td to remove EventListeners:
    let newtd = td.cloneNode(true);
    
    if (game.board2.all_ship_coordinates.map((coord) => coord.substring(0,coord.length-3)).includes(clickedCoord)) {
        popup.innerHTML = 'Hit!';
        newtd.style.backgroundColor = 'red';
        game.board2.receiveAttack(clickedCoord)

        if (game.board2.isGameOver()) {
            popup.innerHTML = 'GAME OVER! YOU WIN!';
            const newBtn = document.getElementById('new-game');
            setTimeout(() => popup.classList.add('gone'), 4000)
            setTimeout(() => newBtn.classList.remove('gone'), 4000);
        }

    } else {
        newtd.style.backgroundColor = 'lightblue'
        popup.innerHTML = 'Miss!'
    }

    newtd.style.cursor = 'default';
    td.parentNode.replaceChild(newtd, td);
    game.computerAttack();
}

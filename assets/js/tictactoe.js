let gameActive = true;
let winMsg = document.getElementById('win-message');
const resBox = document.querySelector('.resultbox');
const restartButton = document.getElementById('restart-button')
let tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const cells = document.querySelectorAll('.cell');
const cellsArray = Array.from(cells);
cells.forEach(cell => cell.addEventListener('click', cellHandler));

function cellHandler (cellEvent) {

    const cellClicked = cellEvent.target;
    const cellClickedIndex = cellsArray.indexOf(cellClicked);

    if (gameActive !== true) return;

    if (cells[cellClickedIndex].classList.contains('x-object') || 
        cells[cellClickedIndex].classList.contains('o-object')
        ) return;      

    cells[cellClickedIndex].classList.add('x-object');

    const spliceN = tracking.indexOf(cellClickedIndex + 1);
    tracking.splice(spliceN, 1);

    if (checkRes('x-object', cells)) {
        winMsg.innerHTML = 'Вы выиграли';
        resBox.classList.remove("hide");
        gameActive = false;
        return;
    }

    if (tracking.length === 0) {
        winMsg.innerHTML = 'Ничья';
        resBox.classList.remove("hide");
        gameActive = false;
        return;
    }

    compMove();

    if (checkRes('o-object', cells)) {
        winMsg.innerHTML = 'Вы проиграли';
        resBox.classList.remove("hide");
        gameActive = false;
        return;
    }
}

function compMove () {
    const random = Math.floor(Math.random() * tracking.length);
    const compIndex = tracking[random];
    cells[compIndex-1].classList.add('o-object');
    tracking.splice(random, 1);
}

function checkRes(player, cells) {
    function check (pos1, pos2, pos3) {
        if (cells[pos1].classList.contains(player) &
            cells[pos2].classList.contains(player) &
            cells[pos3].classList.contains(player)) {
        return true
        } else return false;
    }

    if (check(0, 3, 6)) return true
    else if (check(1, 4, 7)) return true
    else if (check(2, 5, 8)) return true
    else if (check(0, 1, 2)) return true
    else if (check(3, 4, 5)) return true
    else if (check(6, 7, 8)) return true
    else if (check(0, 4, 8)) return true
    else if (check(2, 4, 6)) return true
}

restartButton.addEventListener('click', restart);

function restart () {
    gameActive = true;
    tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    cells.forEach(cell => cell.classList.remove('x-object'))
    cells.forEach(cell => cell.classList.remove('o-object'))
    resBox.classList.add("hide");
}

// restartButton.addEventListener('click', restart => location.reload());



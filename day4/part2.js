const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const order = input[0].split(',');
const boards = input.slice(2).join('\n').split('\n\n').map(x => x.split('\n').map(x => x.split('').reduce((all, one, i) => {
    const ch = Math.floor(i/3);
    all[ch] = [].concat((all[ch] || []), one);
    return all;
}, [])
    .map(x => parseInt(x.join('').trim()))))
    .map(board => ({
            won: false,
            all: Object.fromEntries(board.map(line => line.join(' ')).join(' ').split(' ').map(x => [x, false])),
            lines: [...board, ...board[0].map((_, i) => {
                return [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i]]
            })]
        }
    ));
order.forEach(number => {
    boards.forEach(board => {
        if (!Object.keys(board.all).includes(number)) return;
        // console.log('hit', number);
        board.all[number] = true;
        if (board.lines.map(line => {
            return line.every(x => board.all[x+""])
        }).some(x => x) && !board.won) {
            let sum = 0;
            for (const [key, value] of Object.entries(board.all)) {
                if (!value) sum += +key;
            }
            console.log(sum * +number);
            board.won = true;
        }
    });
});
const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.split('').map(x => +x));
console.log(`opening ${filename}`);

let risk = 0;
input.forEach((line, i) => {
    line.forEach((height, j) => {
        if ((input[i-1] ? input[i-1][j] > height : true) && (line[j-1] !== undefined ? line[j-1] > height : true) && (line[j+1] !== undefined ? line[j+1] > height : true) && (input[i+1] ? input[i+1][j] > height : true)) {
            risk += 1 + height;
        }
    });
});

console.log(risk);
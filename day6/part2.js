const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split(',').map(x => +x);
console.log(`opening ${filename}`);

let school = Array(9).fill(0n);

for (let i = 0; i < input.length; i++) {
    school[input[i]]++;
}

for (let i = 0; i < 1000000; i++) {
    school = [...school.slice(1,7), school[0] + school[7], school[8], school[0]];
}
console.log(school.reduce((p, c) => p + c, 0n));
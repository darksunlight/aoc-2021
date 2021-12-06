const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split(',').map(x => +x);
console.log(`opening ${filename}`);

let school = Array.from(input);

for (let i = 0; i < 80; i++) {
    for (let j = 0; j < school.length; j++) {
        if (school[j] == 0) {
            school.push(9);
            school[j] = 6;
        } else {
            school[j] -= 1;
        }
    }
}
console.log(school.length);
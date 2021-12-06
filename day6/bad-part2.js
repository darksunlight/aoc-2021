const filename = './input.txt';
const fs = require('fs');
const input = fs.readFileSync(filename, 'utf-8').split(',').map(x => +x);
console.log(`opening ${filename}`);

let school = Uint8Array.from(input);

for (let i = 0; i < 256; i++) {
    for (let j = 0; j < school.length; j++) {
        if (school[j] == 0) {
            let newSchool = new Uint8Array(school.length + 1);
            newSchool.set([9], school.length);
            school = newSchool;
            school[j] = 6;
        } else {
            school[j] -= 1;
        }
    }
}
console.log(school.length);
const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let gamma = Array(input[0].length).fill("0");
let epsilon = Array(input[0].length).fill("0");

let zeros = Array(input[0].length).fill(0);
let ones = Array(input[0].length).fill(0);

input.forEach(line => {
    [...line].forEach((char, index) => {
        if (char == "0") zeros[index]++;
        else ones[index]++;
    });
})

for (let i = 0; i < zeros.length; i++) {
    if (zeros[i] > ones[i]) gamma[i] = "1";
    else epsilon[i] = "1";
}
console.log(parseInt(gamma.join(''),2)*parseInt(epsilon.join(''),2))
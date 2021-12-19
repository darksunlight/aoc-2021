// Day 15 - Part 2 (currently returns an incorrrect answer after 18 hours)
const filename = './input.txt';
const fs = require('fs');
const raw = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.split('').map(x => +x));
console.log(`opening ${filename}`);

/**
 * 
 * @param {number[]} arr 
 * @returns 
 */
function five(arr) {
    let out = [];
    for (let i = 0; i < 5; i++) {
        out = [...out, ...arr.map(v => v + i > 9 ? v + i - 9 : v + i)];
    }
    return out;
}

let input = [];
for (let i = 0; i < 5; i++) {
    input = [...input, ...raw.map(line => line.map(v => v + i > 9 ? v + i - 9 : v + i))];
}
input = input.map(line => five(line));

// console.log(input.map(x => x.join('')).join('\n'));

function length(u, v) {
    return 1 + v[1];
}

function dijkstra() {
    const vertices = new Map();
    let dist = {};
    let prev = {};
    input.forEach((line, y) => {
        line.forEach((v, x) => {
            const coord = `${x},${y}`;
            dist[coord] = 9e9;
            prev[coord] = undefined;
            vertices.set(coord, v);
        });
    });
    dist['0,0'] = 0;

    while (vertices.size > 0) {
        console.log('size', vertices.size);
        const u = [...vertices.entries()].sort((a, b) => dist[a[1]] - dist[b[1]])[0];
        const [ux, uy] = u[0].split(',').map(x => +x);
        vertices.delete(u[0]);
        for (const [k, v] of vertices.entries()) {
            const [x, y] = k.split(',').map(x => +x);
            if (!(uy == y && Math.abs(x - ux) == 1) && !(ux == x && Math.abs(y - uy) == 1)) continue;
            console.log(u, [k, v], (dist[u[0]] >= 9e9 ? 0 : dist[u[0]]));
            const alt = (dist[u[0]] >= 9e9 ? 0 : dist[u[0]]) + length(u, [k, v]);
            if (alt < dist[k]) {
                dist[k] = alt;
                prev[k] = u[0];
            }
        }
    }

    return { dist, prev };
}

const result = dijkstra();

// reconstruct path
const path = [`${input.length - 1},${input[0].length - 1}`];
// console.log(result);
while (path[path.length - 1] !== '0,0') {
    if (path[path.length - 1]) console.log(path[path.length - 1])
    path.push(result.prev[path[path.length - 1]]);
}

console.log(path.reverse().map(n => {
    const [x, y] = n.split(',').map(x => +x);
    return input[y][x];
}).reduce((p, c) => p + c, 0) - input[0][0]);

console.log(path);
// console.log(result.dist[`${input.length - 1},${input[0].length - 1}`] - (input.length - 1 + input[0].length - 1));

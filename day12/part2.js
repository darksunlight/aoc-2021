const filename = './input.txt';
const fs = require('fs');
let input = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.split('-'));
console.log(`opening ${filename}`);

const connections = {};

let paths = [];

input.forEach(line => {
    if (!connections[line[0]]) connections[line[0]] = [];
    if (!connections[line[1]]) connections[line[1]] = [];
    connections[line[0]].push(line[1]);
    connections[line[1]].push(line[0]);
});

/**
 * 
 * @param {string} start 
 * @param {string[]} path
 * @param {string|null} small
 */
function explore(start, path, small) {
    for (let i = 0; i < connections[start].length; i++) {
        const newPath = Array.from(path);
        let newSmall = small;
        const connection = connections[start][i];
        if (connection == 'start') continue;
        if (path.filter(x => x == connection).length > 0 && connection == connection.toLowerCase()) {
            if (small) continue;
            newSmall = connection;
        }
        newPath.push(connection);
        if (connection == 'end') {
            paths.push(newPath);
            continue;
        }
        explore(connection, newPath, newSmall);
    }
}

explore('start', ['start'], null);

console.log(paths.map(x => x.join(',')).join('\n'))
console.log(paths.length);
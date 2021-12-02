require('fs') // require node js module
    .readFileSync('./input.txt', 'utf-8') // read the file
    .split('\n') // split them into lines (2000)
    .map(x => parseInt(x)) // convert them from string to integer
    .map((e, i, a) => e > a[i-1]) // map them to whether they are larger than the previous number
    .filter(x => x) // filter out false values
    .length // get the length
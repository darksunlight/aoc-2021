s=Array(9).fill(0);`${require('fs').readFileSync('t')}`.split`,`.map(x=>s[+x]++);for(i=0;i<256;i++)s=[...s.slice(1,7),s[0]+s[7],s[8],s[0]];console.log(s.reduce((p, c) => p + c, 0));
h=d=0;`${require('fs').readFileSync('t')}`.split`
`.map(l=>{[o,a]=l.split` `;o.length-7?d+=o=='up'?-a:+a:h+=+a});console.log(h*d);
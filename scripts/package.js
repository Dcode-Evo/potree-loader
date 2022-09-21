const fs = require('fs');

const packageGlobal = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}));
const packageLib = JSON.parse(fs.readFileSync('src/package.json', {encoding: 'utf8'}));
fs.writeFileSync('dist/package.json', JSON.stringify({...packageLib, version: packageGlobal.version}, null, 2), {encoding: 'utf8'});
const path = require('path');
const appModulePath = require('app-module-path');

console.log(process.cwd());

appModulePath.addPath(path.join(process.cwd(), '/'));

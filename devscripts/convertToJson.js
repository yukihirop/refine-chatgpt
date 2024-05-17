// convertToJson.js
const fs = require('fs');
const path = require('path');

const ja_promptData = require('../prompts/ja.js');

const jsonContent = JSON.stringify(ja_promptData, null, 2);

fs.writeFileSync(path.join(__dirname, '../dist/prompts/ja.json'), jsonContent, 'utf8');
console.log('ja.js has been converted to ja.json');

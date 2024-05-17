import fs from 'fs';
import { promisify } from 'util';
import ja_promptData from '../src/prompts/ja.mjs';

const writeFile = promisify(fs.writeFile);

export default async function convertToJson(buildPath) {
  const jsonContent = JSON.stringify(ja_promptData, null, 2);
  await writeFile(`${buildPath}/prompts/ja.json`, jsonContent, 'utf8');
  console.log('ja.js has been converted to ja.json');
}

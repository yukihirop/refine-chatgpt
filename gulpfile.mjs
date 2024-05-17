#!/usr/bin/env zx

import gulp from 'gulp';
import shell from 'gulp-shell';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import convertToJson from './devscripts/convertToJson.mjs';

import { $ } from 'zx'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = 'dist';
const maxGenerations = 5;

async function cleanOldGenerations() {
  const directories = fs.readdirSync(buildDir)
    .filter(file => fs.statSync(path.join(buildDir, file)).isDirectory() && file !== 'latest')
    .sort((a, b) => fs.statSync(path.join(buildDir, b)).mtime - fs.statSync(path.join(buildDir, a)).mtime);

  if (directories.length > maxGenerations) {
    const oldDirectories = directories.slice(maxGenerations);
    for (const dir of oldDirectories) {
      await $`rm -rf ${path.join(buildDir, dir)}`;
    }
  }
}

async function copyToLatest(buildPath) {
  const latestPath = path.join(buildDir, 'latest');

  // Use gulp-shell to execute the copy command
  return gulp.src(buildPath)
    .pipe(shell([
      `cp -r ${buildPath}/* ${latestPath}`
    ]));
}

function build() {
  const buildName = `${new Date().getTime()}`;
  const buildPath = path.join(buildDir, buildName);

  return gulp.src(['src/**/*', '!src/prompts/*', '!src/scripts/exports.js', '!src/tampermonkey/exports.js'])
    .pipe(gulp.dest(buildPath))
    .on('end', async () => {
      await convertToJson(buildPath)
      await copyToLatest(buildPath)
    });
}

export default gulp.series(
  cleanOldGenerations,
  build
);

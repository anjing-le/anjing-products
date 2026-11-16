import { mkdir, cp, readFile, copyFile, writeFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('assets', 'dist/assets', { recursive: true });
// A returning visitor may still have the previous water shader in the HTTP cache.
const shaderPath = 'assets/ripples.js';
const shader = await readFile('dist/' + shaderPath);
const hash = createHash('sha256').update(shader).digest('hex').slice(0, 16);
const versionedPath = 'assets/ripples.' + hash + '.js';
await copyFile('dist/' + shaderPath, 'dist/' + versionedPath);
const html = await readFile('index.html', 'utf8');
const entry = 'src="' + shaderPath + '"';
if (!html.includes(entry)) throw new Error('Missing water shader entry in index.html');
await writeFile('dist/index.html', html.replace(entry, 'src="' + versionedPath + '"'));
const commit = process.env.CF_PAGES_COMMIT_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
await writeFile('dist/build-info.json', JSON.stringify({ commit }, null, 2) + '\n');

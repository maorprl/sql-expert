import { copyFile, mkdir } from 'node:fs/promises';

const files = [
  'startup-ecosystem-schema.sql',
  'startup-ecosystem-seed.sql',
];

await mkdir('dist/startup-ecosystem', { recursive: true });
await Promise.all(files.map((file) => copyFile(
  `startup-ecosystem/${file}`,
  `dist/startup-ecosystem/${file}`,
)));

import type { Models } from '@liukewia/use-model';
const models: Models = {};
const modelFiles = require.context('.', false, /\.(j|t)s$/);
modelFiles.keys().forEach((fileName) => {
  const resolvedName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
  if (resolvedName === 'index') return;
  models[resolvedName] = modelFiles(fileName).default;
});

export default models;

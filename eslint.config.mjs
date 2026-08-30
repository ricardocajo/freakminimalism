import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// ESLint 9 requires flat config, and Next 16 dropped `next lint`. Without this
// file `eslint` refused to start, so linting had been silently doing nothing.
export default [
  { ignores: ['.next/**', 'node_modules/**', 'public/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

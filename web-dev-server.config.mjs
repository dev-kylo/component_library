import { storybookPlugin } from '@web/dev-server-storybook';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import commonjsRollup from '@rollup/plugin-commonjs';

const commonjs = fromRollup(commonjsRollup);

/** @type {import('@web/dev-server').Config} */
export default ({
  nodeResolve: true,
  open: true,
  plugins: [
    commonjs({ include: '**/node_modules/@stencil/core/**/*.js' }),
    esbuildPlugin({ ts: true, tsx: true }),
    storybookPlugin({ type: 'web-components' })
  ],
});

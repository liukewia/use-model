import alias from '@rollup/plugin-alias'; // alias 和 reslove 功能
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'; // cjs => esm
import eslint from '@rollup/plugin-eslint';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 解析 node_modules 中的模块
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript'; // 让 rollup 认识 ts 的代码
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
const path = require('path');
const resolveDir = dir => path.join(__dirname, dir);

// https://juejin.cn/post/7074116683673108493
// https://juejin.cn/post/6966803733871067144
export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom'],
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      plugins: [terser()],
    },
    {
      file: pkg.module,
      format: 'es',
      name: pkg.name,
      plugins: [terser()],
    },
  ],
  plugins: [
    clear({ targets: ['dist', 'es', 'lib'] }),
    nodeResolve(),
    json(),
    image(),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({ babelHelpers: 'bundled' }),
    postcss(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolveDir('src'),
        },
      ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true,
    }),
    // https://github.com/rollup/rollup-plugin-commonjs/issues/361
    commonjs({ include: /node_modules/ }),
    // eslint({
    //   throwOnError: true, // 抛出异常并阻止打包
    //   include: ['src/**'],
    //   exclude: ['node_modules/**'],
    // }),
  ],
};

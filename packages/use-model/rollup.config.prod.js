import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import baseConfig from './rollup.config.base';

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    copy({
      targets: [
        {
          src: 'src/public/**/*',
          dest: 'es',
        },
      ],
    }),
    filesize(),
  ],
};

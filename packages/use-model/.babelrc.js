module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // rollupjs 会处理模块，所以设置成 false, 否则babel会在rollup有机会执行其操作之前导致我们的模块转化为commonjs
        modules: false,
      },
    ],
  ],
  plugins: [],
};

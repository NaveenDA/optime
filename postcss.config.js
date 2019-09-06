module.exports = ctx => ({
  map: ctx.map ? true : false,
  plugins: {
    autoprefixer: true,
    "postcss-focus": true,
    cssnano: {}
  }
});

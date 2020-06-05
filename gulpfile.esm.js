import { series, parallel } from 'gulp';

const browserSync = require('browser-sync').create();

const isProduction = process.env.NODE_ENV === 'production';

const devServerPort = 3000;
const devServerUIPort = 3001;
export function serverStart(done) {
  browserSync.init({
    port: devServerPort,
    ui: {
      port: devServerUIPort,
    },
    notify: false,
    server: 'dist',
    open: false,
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false,
    },
  });
  done();
}
export function serverReload(done) {
  browserSync.reload();
  console.log(`dev server: http://localhost:${devServerPort}`);
  done();
}

export async function clean() {
  const path = require('path').posix;
  const del = require('del');
  await del([path.resolve(__dirname, 'dist')], { force: true });
}

export async function webpack() {
  const { src, dest } = require('gulp');
  const noop = require('gulp-noop');
  const plumber = require('gulp-plumber');
  const sourcemaps = require('gulp-sourcemaps');
  const webpackStream = require('webpack-stream');

  delete require.cache[require.resolve('./webpack.config.js')];

  // NOTE: webpack 使うときの src() と dest() は意味無してなさそう?
  return src(['src/scripts/*.{ts,tsx}'])
    .pipe(plumber())
    .pipe(isProduction ? noop() : sourcemaps.init())
    .pipe(webpackStream(require('./webpack.config.js')))
    .pipe(isProduction ? noop() : sourcemaps.write({ includeContent: true }))
    .pipe(dest('dist/scripts'));
}

export async function sass() {
  const { src, dest } = require('gulp');
  const gulpSass = require('gulp-sass');
  return src(['src/styles/**/*.scss', '!_*'])
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(dest('dist/styles'));
}

export async function html() {
  const { src, dest } = require('gulp');
  const cachebust = require('gulp-cache-bust');
  const noop = require('gulp-noop');
  return src('src/index.html')
    .pipe(isProduction ? noop() : cachebust({ type: 'timestamp' }))
    .pipe(dest('dist'));
}

export const all = series(parallel(webpack, sass), html);

export function watch() {
  const { watch: gulpWatch } = require('gulp');
  gulpWatch(
    ['src/scripts/**/*.{ts,tsx}', 'webpack.*.js', 'babel.config.js'],
    { events: 'all' },
    series(webpack, serverReload),
  );
  gulpWatch(
    ['src/styles/**/*.scss'],
    { events: 'all' },
    series(sass, serverReload),
  );
  gulpWatch(['src/**/*.html'], { events: 'all' }, series(html, serverReload));
}

export const build = series(clean, all);
export default series(clean, all, parallel(serverStart, watch));

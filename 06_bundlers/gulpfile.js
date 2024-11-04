import gulp from 'gulp';
import concat from 'gulp-concat';
import htmlclean from 'gulp-htmlclean';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import svgSprite from 'gulp-svg-sprite';
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import * as del from 'del'; 
import browserSync from 'browser-sync';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs'; 
import through2 from 'through2';


const { src, dest, series, parallel, watch } = gulp;

const argv = yargs(hideBin(process.argv)).argv;
const isProd = argv.prod;
const dist = isProd ? 'build' : 'dev';
const noop = () => through2.obj();

const clean = () => del.deleteAsync([dist]);

// const resources = () => {
//     console.log("Сборка - " + isProd ? "Prod" : "Dev")
//     if (!isProd) {
//         return src('src/resources/**')
//             .pipe(dest(dist));
//     } else {
//         return noop();        
//     }
// };

const resources = () => {
    console.log("Сборка - " + isProd ? "Prod" : "Dev")
    return src('src/resources/**')
        .pipe(dest(dist));
};


const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(!isProd ? sourcemaps.init() : noop())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(isProd ? cleanCSS({ level: 2 }) : noop())
        .pipe(!isProd ? sourcemaps.write() : noop())
        .pipe(dest(dist))
        .pipe(browserSync.stream());
};

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(isProd ? htmlclean({ collapseWhitespace: true }) : noop())
        .pipe(dest(dist))
        .pipe(browserSync.stream());
};

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest(`${dist}/images`));
};


const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
        .pipe(!isProd ? sourcemaps.init() : noop())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(isProd ? terser().on('error', notify.onError()) : noop())
        .pipe(!isProd ? sourcemaps.write() : noop())
        .pipe(dest(dist))
        .pipe(browserSync.stream());
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: dist
        }
    });
};

watch('src/resources/**', resources);
watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', resources);

export const cleanTask = clean;
export const resourcesTask = resources;
export const htmlMinifyTask = htmlMinify;
export const stylesTask = styles;
export const svgSpritesTask = svgSprites;
// export const imagesTask = images;
export const scriptsTask = scripts;

export const build = series(clean, resources, htmlMinify, styles, svgSprites,  scripts, watchFiles);
export const prod = series(clean, parallel(htmlMinify, styles, svgSprites, scripts));

// export const defaultTask = series(clean, resources, htmlMinify, styles, svgSprites, images, scripts, watchFiles);
// export const buildTask = series(clean, parallel(htmlMinify, styles, svgSprites, images, scripts));

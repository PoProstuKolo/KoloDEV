const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const kit = require('gulp-kit')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const paths = {
	html: {
		src: './html/**/*.kit',
	},
	sass: {
		src: './src/sass/main.scss',
		dest: './dist/css',
		watch: './src/sass/**/*.scss',
	},
	js: {
		src: './src/js/**/*.js',
		dest: './dist/js',
	},
	img: {
		src: './src/img/**/*.{jpg,jpeg,png,gif,svg}',
		dest: './dist/img',
	},
	fonts: {
		src: './src/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}',
		dest: './dist/fonts',
	},
	dist: {
		src: './dist',
	},
}

function buildStyles(done) {
	src(paths.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sass.dest))
	done()
}

function javaScript(done) {
	src(paths.js.src)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/preset-env'],
			})
		)
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.js.dest))
	done()
}
function convertImages(done) {
	src(paths.img.src, { encoding: false }).pipe(imagemin()).pipe(dest(paths.img.dest))
	done()
}

function copyFonts(done) {
	src(paths.fonts.src).pipe(dest(paths.fonts.dest))
	done()
}

function handleKits(done) {
	src(paths.html.src).pipe(kit()).pipe(dest('./'))
	done()
}

function cleanStuff(done) {
	src(paths.dist.src, { read: false }).pipe(clean())
	done()
}

function startBrwowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}

function watchForChanges(done) {
	watch('./*.html').on('change', reload)
	watch([paths.html.src, paths.sass.watch, paths.js.src], parallel(handleKits, buildStyles, javaScript)).on(
		'change',
		reload
	)
	watch(paths.img.src, convertImages).on('change', reload)
	done()
}

const mainFunctions = parallel(handleKits, buildStyles, javaScript, copyFonts)
exports.convertImages = convertImages
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrwowserSync, watchForChanges)

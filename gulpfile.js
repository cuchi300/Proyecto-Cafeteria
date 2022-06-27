const { src, dest, watch, series } = require('gulp');

// css y sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); 
const sourcemaps = require('gulp-sourcemaps'); // cuando quremos realizar algun cambio y queremos ubicar en que archivo sass esta
const cssnano = require('cssnano'); // mimifica la hoja de estilo, mejora la calidad, y baja los kb 

//imagenes
const imagemin = require('gulp-imagemin'); // para bajar los megas a la imagen
const webp = require('gulp-webp'); // para transformar imagens a webp
const avif = require('gulp-avif'); // para transformar imagenes a avif

//javascript
const terser = require('gulp-terser'); // para compilar javascript

function css(done) {
    // compilar sass
    // paso 1: identificar archivo, 2 - compilar, 3 - guardar el .css
    src('src/scss/app.scss')
        .pipe(sourcemaps.init()) // para iniciar sourcemap
        .pipe(sass()) // compila
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.')) // grabamos el sourcemap como css
        .pipe(dest('build/css'))

    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }) ) // optimiza la imagen
        .pipe(dest('build/img'))
}

function versionWebp() {
    // const opciones = {
    //     quality = 50;
    // }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )

}

function versionAvif() {
    return src('src/img/**/*.{png,jpg}')
    // const opciones = {
    //     quality = 50;  para aligerar mucho mas las imagenes
    // }
        .pipe( avif( opcioness ) )
        .pipe( dest('build/img') )
}

function javascript() {
    return src('src/js/**/*.js')
      .pipe( terser() )
      .pipe( dest('build/js') );
}

function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    watch('src/img/**/*', imagenes)
    watch('src/img/**/*', versionWebp)
}


exports.css = css;
exports.javascript = javascript;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( css, javascript, dev );


//series -- se inicia una tarea , y hasta que finaliza, inicia la siguiente
// parallel -- todas inician al mismo tiempo
// siempre dejar para el final la que contenga el watch
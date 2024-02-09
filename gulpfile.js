const { src, dest, watch, series } = require('gulp'); // cuando tiene llaves es porque importa mas de una funcion

// CSS y SASS
const sass = require('gulp-sass')(require('sass')); // paquete que compila hoja de estilos de sass a css
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');  
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css() {
    // compilar sass
    // pasos: 1 - Identificar archivo, 2 - Compilarla, 3 - Gaurdar el .css
    return src('src/scss/app.scss') // identifico ruta hoja de estilos scss
        .pipe( sourcemaps.init() ) // inicia tarea sourcemaps, antes de sass
        .pipe( sass() ) // convertimos esas hoja de scss a css // con {outputStyle:'compressed'} te comprime para que su peso sea menor.
        .pipe( postcss([ autoprefixer(), cssnano() ]) ) // el corchete es un arreglo en javascript // a postcss se lepe pueden pasar multiples libreriras que modifiquen el codigo css
        .pipe( sourcemaps.write('.')) // para que se guarde junto al build
        .pipe( dest('build/css') ) // creamos la carpeta build/css para guardar el archivo transformado a css

    // done(); // para que finalize la tarea sin error
    // tambien se coloca RETURN al lado de SRC
}

function versionWebp() {
    const opciones = {
        quality: 50 // buena calidad y con menos peso de archivo
    }
    return src('src/img/**/*.{png,jpg}') // de esta forma para que lea archivos png y jpg
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('build/img') )
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))
}

//la funcion watch revisa si hay cambios en la hoja scss asi automaticamente los aplica en la hoja de css
// no tiene que haber dos funciones con el mismo nombre porque gulp se confunde
function dev() {
    //    revisa el archivo    funcion que ejecuta
    // para que las imagenes que voy agrgando se integren en la carpeta build automaticamente hay que colocar watch
    watch('src/scss/**/*.scss', css );
    watch('src/img/**/*', imagenes )
}

exports.css = css; // para llamar la tarea y ejecutarla en terminal con (gulp css)
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(css, dev);

// npm i --save-dev gulp sass gulp-sass autoprefixer gulp-postcss gulp-imagemin gulp-webp gulp-avif cssnano
// instalar gulp-sourcemaps para saber donde esta cada linea de sass para editar nuestro codigo
// cssnano para mimificar el codigo
// gulp-postcss y autoprefixer crea codigo soportado para otros navegadores 
// series = se inicia la tarea, y hasta que finaliza, inicia la siguiente.
// parallel = Todas inician al mismo tiempo
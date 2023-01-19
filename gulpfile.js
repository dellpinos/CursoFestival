const { src, dest, watch, parallel } = require("gulp"); // extraigo las funcionalidades de la dependencia gulp

// CSS

const sass = require("gulp-sass")(require('sass')); // extraigo gulp-sass y con esta extraigo sass
const plumber = require('gulp-plumber');

// Imagenes
const webp = require("gulp-webp");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin"); //la variable puede tener cualquier nombre
const avif = require("gulp-avif");

function css (done) { //defino la funcion/tarea

    src('src/scss/**/*.scss')     // identificar archivo de SASS
        .pipe( plumber())
        .pipe( sass() )     // compilarlo
        .pipe( dest('build/css'));     // almacenar en el disco

    done(); // callback
}

function imagenes (done) {

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin( opciones) ) )
    .pipe( dest('build/img'))

    done();
}

function versionWebp (done) { //comprime imagenes a webp

    const opciones = { // argumento de calidad de la compresion
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe ( webp(opciones) )
    .pipe ( dest('build/img') );
    
    done();
}
function versionAvif (done) { //comprime imagenes a webp

    const opciones = { // argumento de calidad de la compresion
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe ( avif(opciones) )
    .pipe ( dest('build/img') );
    
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
    .pipe ( dest( 'build/js'));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css; // nombre de la tarea
exports.imagenes;
exports.versionWebp = versionWebp; //nombre de tarea
exports.versionAvif = versionAvif;
exports.javascript = javascript;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev); // nombre de la tarea




// un pipe es una accion q se realiza despues de otra

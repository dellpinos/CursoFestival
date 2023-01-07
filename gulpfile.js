const { src, dest, watch } = require("gulp"); // extraigo las funcionalidades de la dependencia gulp
const sass = require("gulp-sass")(require('sass')); // extraigo gulp-sass y con esta extraigo sass
const plumber = require('gulp-plumber');

function css (done) { //defino la funcion/tarea

    src('src/scss/**/*.scss')     // identificar archivo de SASS
        .pipe( plumber())
        .pipe( sass() )     // compilarlo
        .pipe( dest('build/css'));     // almacenar en el disco

    done(); // callback
}

function dev(done) {
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css; // nombre de la tarea
exports.dev = dev; // nombre de la tarea


// un pipe es una accion q se realiza despues de otra

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp() {
    crearGaleria();
    leerTexto();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria');

    for(let i = 1; i <= 10; i++){
        const div = document.createElement('div');
        const imagen = document.createElement('picture');
        div.classList.add('imagen');
        imagen.innerHTML = `
                        <source srcset="build/img/galeria/galeria_${i}.avif" type="image/avif">
                        <source srcset="build/img/galeria/galeria_${i}.webp" type="image/webp">
                        <img loading="lazy" src="build/img/galeria/galeria_${i}.jpg" alt="imagen galeria">
                        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(div)
        div.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `<source srcset="build/img/galeria/galeria_${id}.avif" type="image/avif">
                        <source srcset="build/img/galeria/galeria_${id}.webp" type="image/webp">
                        <img loading="lazy" src="build/img/galeria/galeria_${id}.jpg" alt="imagen galeria">
                        `;

// crear overlay con imagen
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.appendChild(imagen);
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    
// boton cerrar modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('cerrar-modal');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // añadir al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}

const datos = {
    nombre: '',
    email: '',
    persona: '',
    hora: '',
    fecha: ''
}

    

const formulario = document.querySelector('.formulario');
formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const {nombre, email, persona, hora, fecha} = datos;
    if(nombre === '' || email === '' || persona === '' || hora === '' || fecha === ''){
        mostrarError('Los campos estan vacios');
        return;
    }

    mensajeEnviado('Datos enviado correctamente')
})

const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const persona = document.querySelector('#persona');
const hora = document.querySelector('#hora');
const fecha = document.querySelector('#fecha');

nombre.addEventListener('input', leerTexto);
email.addEventListener('input', leerTexto);
persona.addEventListener('input', leerTexto);
hora.addEventListener('input', leerTexto);
fecha.addEventListener('input', leerTexto);


function leerTexto(e) {
    datos[e.target.id] = e.target.value;
}

function mostrarError(mensaje){
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('error');

    formulario.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
}

function mensajeEnviado(mensaje) {
    const correcto = document.createElement('p');
    correcto.textContent = mensaje;
    correcto.classList.add('correcto');

    formulario.appendChild(correcto);

    setTimeout(() => {
        correcto.remove();
    }, 3000);
}


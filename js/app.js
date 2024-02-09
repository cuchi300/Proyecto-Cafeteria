document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
})

function iniciarApp() {
    navClick();
    scrollWindow();
}

function navClick(){
    const boton = document.getElementById('navbar');
    boton.addEventListener('click', () => {
        const scrolling = window.scrollY;
        // const btn = document.getElementById('navbar');
        const navPrincipal = document.querySelector('.nav-principal');
    
        if(scrolling < 450){
            navPrincipal.classList.toggle('mostrar');
        }
        
        if(scrolling > 450) {
           navPrincipal.classList.toggle('bajar');
        }
    })
}

function scrollWindow(){
    window.addEventListener('scroll', () => {
        const scrolling = window.scrollY;
        const navPrincipal = document.querySelector('.nav-principal');
        const barra = document.querySelector('.barra');
        // const boton = document.getElementById('navbar');
    
        if(scrolling > 0){
            navPrincipal.classList.remove('mostrar');
            navPrincipal.classList.remove('bajar');
        } 
        
        if(scrolling > 450){
            barra.classList.add('mostrar');
            navPrincipal.classList.add('posicion');
        }
        if(scrolling < 400) {
            barra.classList.remove('mostrar');
            navPrincipal.classList.remove('posicion');
        }
    })
}


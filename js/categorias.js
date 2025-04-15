// Obtenemos todos los K-Dramas de tus páginas de reseñas
const doramas = [
    // Estos datos deberían coincidir con los de tus páginas individuales
    {
        id: 1,
        titulo: "Tu Tiempo Llama",
        imagen: "../imagenes/tuTiempoLlama.jpg",
        categorias: ["Romance", "Fantasía", "Drama"], // Exactamente como en tu página
        enlace: "../pages/dorama1.html"
    },
    {
        id: 2,
        titulo: "Veinticinco Veintiuno",
        imagen: "../imagenes/VeinticincoVeintiuno.jpg",
        categorias: ["Romance", "Drama", "Deporte"],
        enlace: "../pages/dorama2.html"
    },
    // Añade aquí todos tus K-Dramas con sus categorías exactas
];

// Función para extraer categorías únicas de todos los doramas
function obtenerCategoriasUnicas() {
    const todasCategorias = doramas.flatMap(dorama => dorama.categorias);
    return [...new Set(todasCategorias)]; // Elimina duplicados
}

// Función para renderizar los botones de categoría
function renderizarFiltros() {
    const contenedor = document.getElementById('filtros-categorias');
    const categorias = obtenerCategoriasUnicas();
    
    categorias.forEach(categoria => {
        const boton = document.createElement('button');
        boton.className = 'btn btn-categoria';
        boton.textContent = categoria;
        boton.dataset.categoria = categoria.toLowerCase().replace(/\s+/g, '-');
        contenedor.appendChild(boton);
    });
    
    // Añadir event listeners a los nuevos botones
    document.querySelectorAll('.btn-categoria').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtrarDoramas(this.dataset.categoria);
        });
    });
}

// Función para filtrar y mostrar doramas
function filtrarDoramas(categoria = 'todas') {
    const contenedor = document.getElementById('contenedor-doramas');
    const titulo = document.getElementById('titulo-categoria-seleccionada');
    
    const doramasFiltrados = categoria === 'todas' 
        ? doramas 
        : doramas.filter(dorama => 
            dorama.categorias.some(cat => 
                cat.toLowerCase().replace(/\s+/g, '-') === categoria
            )
        );
    
    titulo.textContent = categoria === 'todas' 
        ? 'Todos los K-Dramas' 
        : `K-Dramas de ${categoria.replace(/-/g, ' ')}`;
    
    contenedor.innerHTML = '';
    
    doramasFiltrados.forEach(dorama => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card card-dorama h-100">
                <a href="${dorama.enlace}">
                    <img src="${dorama.imagen}" class="card-img-top card-dorama-img" alt="${dorama.titulo}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${dorama.titulo}</h5>
                    <div class="d-flex flex-wrap mt-2">
                        ${dorama.categorias.map(cat => `
                            <span class="badge bg-primary me-1 mb-1">${cat}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderizarFiltros();
    filtrarDoramas();
});
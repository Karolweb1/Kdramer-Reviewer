function cargarKdramas(config) {
    fetch(config.jsonPath)
    .then(response => response.json())
    .then(data => {
        const filtroTipo = config.filtroTipo || 'categorias'; // 'categoria' o 'plataforma'
        const contenedorFiltros = document.querySelector(config.selectorFiltros);
        const contenedorTarjetas = document.querySelector(config.selectorTarjetas);
        const titulo = document.querySelector(config.selectorTitulo);

        const set = new Set(data.map(d => d[filtroTipo]));
        const lista = Array.from(set);

        contenedorFiltros.innerHTML = `<button class="btn btn-categoria active" data-filtro="todas">Todas</button>`;
        lista.slice(0, 3).forEach(item => {
            contenedorFiltros.innerHTML += `<button class="btn btn-categoria" data-filtro="${item}">${item}</button>`;
        });

        if (lista.length > 3) {
            let dropdown = `
                <div class="dropdown">
                    <button class="btn btn-categoria dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Más
                    </button>
                    <ul class="dropdown-menu">`;
            lista.slice(3).forEach(item => {
                dropdown += `<li><a class="dropdown-item" href="#" data-filtro="${item}">${item}</a></li>`;
            });
            dropdown += `</ul></div>`;
            contenedorFiltros.innerHTML += dropdown;
        }

        const mostrar = lista => {
            contenedorTarjetas.innerHTML = '';
            lista.forEach(d => {
                contenedorTarjetas.innerHTML += `
                    <div class="col">
                        <div class="card h-100">
                            <img src="${d.imagen}" class="card-img-top" alt="${d.titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${d.titulo}</h5>
                                <p class="card-text">Puntuación: ${d.puntuacion || 0}%</p>
                                <a href="${d.enlace}" class="btn btn-primary">Ver Reseña</a>
                            </div>
                        </div>
                    </div>`;
            });
        };

        mostrar(data);

        contenedorFiltros.addEventListener('click', e => {
            const filtro = e.target.dataset.filtro;
            if (!filtro) return;
            document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filtrados = filtro === 'todas' ? data : data.filter(d => d[filtroTipo] === filtro);
            titulo.textContent = filtro === 'todas' ? 'Todos los K-Dramas' : `Filtrados por ${filtro}`;
            mostrar(filtrados);
        });

        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const filtro = e.target.dataset.filtro;
                const filtrados = data.filter(d => d[filtroTipo] === filtro);
                titulo.textContent = `Filtrados por ${filtro}`;
                mostrar(filtrados);
            });
        });
    });
}

// Hacemos la función accesible globalmente
window.cargarKdramas = cargarKdramas;

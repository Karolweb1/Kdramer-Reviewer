document.addEventListener("DOMContentLoaded", function() {
    // Lista de las páginas de reseñas de los K-dramas (ruta relativa desde la página de categorías)
    const kdramaPages = [
      "../reseñas/1dorama.html",
      "../reseñas/2dorama.html",
      "../reseñas/3dorama.html"
    ];
  
    const galeria = document.getElementById("galeria-romances");
  
    // Función para cargar los K-dramas
    function cargarKdramas() {
      kdramaPages.forEach(page => {
        fetch(page)
          .then(response => response.text())
          .then(data => {
            // Crear un DOM a partir del HTML de la página de reseña
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
  
            // Buscar la categoría en la página de reseña
            const categorias = doc.querySelectorAll(".categorias strong");
  
            // Verificar si alguna de las categorías contiene "Romance"
            let esRomance = false;
            categorias.forEach(categoria => {
              if (categoria.textContent.includes("Romance")) {
                esRomance = true;
              }
            });
  
            // Si la categoría es "Romance", agregamos el K-drama a la galería
            if (esRomance) {
              const nombre = doc.querySelector("h2").textContent;
              const imagen = doc.querySelector("img").src;
              const reseñaUrl = page;
  
              // Crear el item de la galería
              const kdramaItem = document.createElement("div");
              kdramaItem.classList.add("kdrama-item");
  
              kdramaItem.innerHTML = `
                <img src="${imagen}" alt="${nombre}">
                <h3>${nombre}</h3>
                <a href="${reseñaUrl}">Ver reseña</a>
              `;
  
              // Agregar el item a la galería
              galeria.appendChild(kdramaItem);
            }
          })
          .catch(error => console.error("Error cargando la página:", error));
      });
    }
  
    // Llamar la función para cargar los K-dramas de "romance"
    cargarKdramas();
  });
  
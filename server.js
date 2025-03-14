const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = './votos.json'; // Archivo donde se guardarán los votos

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Leer los votos del archivo JSON
function leerVotos() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    return {};
}

// Guardar los votos en el archivo JSON
function guardarVotos(votos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(votos, null, 2), 'utf8');
}

// Endpoint para registrar votos
app.post('/votar', (req, res) => {
    const { kdrama, usuarioID, calificacion } = req.body;
    const votos = leerVotos();

    if (!votos[kdrama]) {
        votos[kdrama] = { total: 0, cantidad: 0, usuarios: {} };
    }

    if (votos[kdrama].usuarios[usuarioID]) {
        return res.status(400).json({ error: "¡Ya has votado por este K-drama!" });
    }

    votos[kdrama].total += calificacion;
    votos[kdrama].cantidad += 1;
    votos[kdrama].usuarios[usuarioID] = calificacion;

    guardarVotos(votos);

    const porcentaje = Math.round((votos[kdrama].total / (votos[kdrama].cantidad * 5)) * 100);

    res.json({ mensaje: "Voto registrado correctamente", porcentaje });
});

// Endpoint para obtener el porcentaje de votos
app.get('/porcentaje/:kdrama', (req, res) => {
    const { kdrama } = req.params;
    const votos = leerVotos();

    if (!votos[kdrama] || votos[kdrama].cantidad === 0) {
        return res.json({ porcentaje: 0 });
    }

    const porcentaje = Math.round((votos[kdrama].total / (votos[kdrama].cantidad * 5)) * 100);

    res.json({ porcentaje });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

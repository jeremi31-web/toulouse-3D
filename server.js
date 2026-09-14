const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3002;

// Chemin absolu pour le dossier public
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

app.get('/api/buildings', (req, res) => {
    // Au lieu d'appeler l'API Overpass qui échoue souvent,
    // on sert directement le fichier échantillon inclus dans l'app.
    const sampleDataPath = path.join(PUBLIC_DIR, 'toulouse_sample.json');
    
    fs.readFile(sampleDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur de lecture du fichier échantillon:", err);
            return res.status(500).json({ error: 'Impossible de charger les données.' });
        }
        res.type('json').send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Serveur interne démarré sur http://localhost:${PORT}`);
});

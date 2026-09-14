const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'toulouse.json');

app.use(express.static('public'));

app.get('/api/buildings', async (req, res) => {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        if (fs.existsSync(DATA_FILE)) {
            console.log('Serving from cache...');
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return res.type('json').send(data);
        }

        console.log('Fetching from Overpass API...');
        // Requête ciblée sur le centre de Toulouse (Capitole)
        const query = `
            [out:json][timeout:25];
            (
              way["building"](43.5980, 1.4380, 43.6080, 1.4500);
            );
            out geom;
        `;
        
        const response = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`);
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(response.data));
        console.log('Data cached successfully.');
        
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
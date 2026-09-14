const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Redirection du dossier de cache pour l'exécutable compilé
let DATA_DIR;
try {
    const { app: electronApp } = require('electron');
    // Dossier local de l'utilisateur (ex: AppData/Roaming/toulouse-3d)
    DATA_DIR = path.join(electronApp.getPath('userData'), 'toulouse-data');
} catch (e) {
    DATA_DIR = path.join(__dirname, 'data');
}

const DATA_FILE = path.join(DATA_DIR, 'toulouse.json');
const app = express();
const PORT = 3002;

// ... (Garde le reste du code de server.js exactement identique à partir de app.use(express.static...))
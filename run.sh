#!/bin/bash
echo "Installation des dépendances..."
npm install

echo "Création du dossier de cache..."
mkdir -p data

echo "Lancement du serveur..."
npm start
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/explanation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'explanation.html'));
});

app.get('/metrics', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'metrics.html'));
});

app.get('/graphs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'graphs.html'));
});

app.get('/detect', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'detect.html'));
});

app.get('/data', (req, res) => {
    const dataDir = path.join(__dirname, 'data');
    fs.readdir(dataDir, (err, files) => {
        if (err) {
            console.error("Impossible de lire le dossier :", err);
            return;
        }

        const jsonFiles = files.filter(file => file.endsWith('.json'));
        let data = [];

        jsonFiles.forEach(file => {
            const filePath = path.join(dataDir, file);
            const fileData = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileData);
            data.push(jsonData);
        });

        res.json(data);
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});


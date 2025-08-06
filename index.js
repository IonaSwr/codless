const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 80;
const CLIENT_DIR = path.join(__dirname, 'client');

app.use(bodyParser.text({ type: '*/*' }));
app.use(express.static(CLIENT_DIR));

// Utility: generate a short random filename
function generateFilename() {
    const id = crypto.randomBytes(4).toString('hex'); // 8 characters
    return `${id}.html`;
}

// POST /save → create new file with random name
app.post('/save', (req, res) => {
    const filename = generateFilename();
    const filePath = path.join(CLIENT_DIR, filename);

    fs.writeFile(filePath, req.body, 'utf8', (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).send('Failed to save file');
        }

        res.json({ filename });
    });
});

// POST /save/:filename → overwrite existing or create specific file
app.post('/save/:filename', (req, res) => {
    const filename = req.params.filename;

    if (!/^[\w\-\.]+$/.test(filename)) {
        return res.status(400).send('Invalid filename');
    }

    const filePath = path.join(CLIENT_DIR, filename);

    fs.writeFile(filePath, req.body, 'utf8', (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).send('Failed to save file');
        }

        res.send('File saved successfully');
    });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});


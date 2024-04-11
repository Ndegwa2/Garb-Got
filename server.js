const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());

app.get('/api/waste-types', (req, res) => {
    const searchTerm = req.query.q;
    fetch(`https://data.epa.ie/epr/api/v1/wastesearchoptions?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching data' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
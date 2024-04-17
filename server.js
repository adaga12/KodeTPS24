const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data storage
let workouts = [];

// Routes
app.get('/workouts', (req, res) => {
    res.json(workouts);
});

app.post('/workouts', (req, res) => {
    const workout = req.body;
    workouts.push(workout);
    res.status(201).json(workout);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');  // Import fs-extra

const app = express();
const PORT = 3000;
const DATA_FILE = './workouts.json';

app.use(bodyParser.json());

// Asynchronously read workouts from file
async function readWorkouts() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(DATA_FILE, JSON.stringify([]), 'utf8');  // Create file if not exists
            return [];
        } else {
            throw error;
        }
    }
}

// Asynchronously write workouts to file
async function writeWorkouts(workouts) {
    await fs.writeFile(DATA_FILE, JSON.stringify(workouts), 'utf8');
}

// Routes
app.get('/workouts', async (req, res) => {
    const workouts = await readWorkouts();
    res.json(workouts);
});

app.post('/workouts', async (req, res) => {
    const newWorkout = req.body;
    const workouts = await readWorkouts();
    workouts.push(newWorkout);
    await writeWorkouts(workouts);
    res.status(201).json(newWorkout);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

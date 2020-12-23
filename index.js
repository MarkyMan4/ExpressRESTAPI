const express = require('express');
const { execArgv } = require('process');
const app = express();

app.use(express.json());

// simulate json data from MongoDB
// Diablo 3 classes
const data = [
    {id: 0, name: 'Wizard', resource: 'Arcane Power'},
    {id: 1, name: 'Necromancer', resource: 'Essence'},
    {id: 2, name: 'Barbarian', resource: 'Fury'},
    {id: 3, name: 'Demon Hunter', resource: 'Hatred & Discipline'},
    {id: 4, name: 'Monk', resource: 'Spirit'},
    {id: 5, name: 'Crusader', resource: 'Wrath'}
]

app.get('/', (req, res) => {
    res.send('Hello');
});

// show all classes
app.get('/api/classes', (req, res) => {
    res.send(data);
});

// look up class by id
app.get('/api/classes/:id', (req, res) => {
    let d3Class = data.find(c => c.id === parseInt(req.params.id));

    if(!d3Class) {
        res.status(404).send('class with id ' + req.params.id + ' not found');
    }
    else {
        res.send(d3Class);
    }
});

// add a new class
app.post('/api/classes', (req, res) => {
    let d3Class = {
        id: data.length + 1,
        name: req.body.name,
        resource: req.body.resource
    };

    try {
        data.push(d3Class);
        res.send(d3Class);
    }
    catch {
        res.send('failed to save new class');
    }
});

app.listen(3000);
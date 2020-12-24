const Joi = require('joi');
const express = require('express');
const { execArgv } = require('process');
const app = express();

app.use(express.json());

let fs = require('fs');
const { parse } = require('path');
const { x } = require('joi');

// simulate json data from MongoDB
// Diablo 3 classes
let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

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
        return;
    }
    else {
        res.send(d3Class);
    }
});

// add a new class
app.post('/api/classes', (req, res) => {

    // need to figure out why this isn't working

    // let schema = {
    //     name: Joi.string().required(),
    //     resource: Joi.string().required()
    // };

    // let result = Joi.valid(req.body, schema);
    // console.log(result);

    // if(result.error) {
    //     res.send(400).send(result.error);
    //     return;
    // }

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

app.put('/api/classes/:id', (req, res) => {
    let d3Class = data.find(c => c.id === parseInt(req.params.id));

    if(!d3Class) {
        res.status(404).send('class does not exist');
        return;
    }

    // TODO: input validation

    // update the class
    if(req.body.name) {
        d3Class.name = req.body.name;
    }

    if(req.body.resource) {
        d3Class.resource = req.body.resource;
    }

    res.send(d3Class);
});

app.delete('/api/classes/:id', (req, res) => {
    let d3Class = data.find(c => c.id === parseInt(req.params.id));

    if(!d3Class) {
        res.status(404).send('class does not exist');
        return;
    }

    let index = data.indexOf(d3Class);
    data.splice(index, 1);

    res.send(d3Class);
});

app.listen(3000);

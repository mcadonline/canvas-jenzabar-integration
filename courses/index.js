// require('dotenv').config()
// var cors = require('cors');

import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { initiateDb } from './utils/db.js';
import  express from 'express';
import { EngineService } from './services/index.js'

// const { initiateDb } = require('./utils/db');
// const express = require('express');
const app = express()
const port = process.env.PORT || 4000;
// const { EngineService } = require('./services')

initiateDb();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    const rulesModel = require('./models/rule.model');
    console.log(req.body);

    let r = rulesModel.all();

    res.json({
        courses: []
    })
})

app.get('/runners', (req, res) => {
    console.log(req.body);

    res.json({
        runners: [
            {
                value: 'generateCourseShells',
                name: 'Generate Course Shells'
            }
        ]
    })
})

app.post('/runners', (req, res) => {
    const run = EngineService.run(req.body.runner);

    res.json({
        done: true
    })
})

app.get('/custom_runners', (req, res) => {
    console.log(req.body);

    res.json({
        runners: [
            {
                value: 'addCanvasCourses',
                name: 'All Canvas Courses'
            },
            {
                value: 'addJenActiveCourses',
                name: 'Add Jenzabar Active Courses'
            },
            {
                value: 'generateCourse',
                name: 'Generate Course Shells'
            }
        ]
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

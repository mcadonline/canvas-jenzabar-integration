// require('dotenv').config()
// var cors = require('cors');

import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { initiateDb } from './utils/db.js';
initiateDb();

import  express from 'express';
import { EngineService, MappingService, DataViewQuery, UserViewQuery } from './services/index.js';
import { Exports } from './models/index.js';

// const { initiateDb } = require('./utils/db');
// const express = require('express');
const app = express()
const port = process.env.PORT || 4000;
// const { EngineService } = require('./services')

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
            },
            {
                value: 'generateEnrollment',
                name: 'Generate Enrolment'
            }
        ]
    })
})

app.get('/exports', (req, res) => {
    console.log(req.query);

    if (req.query.jobId) {
       Exports.FindByJobId(req.query.jobId, (err, data) => {
            if (err) {
                res.status(400).send('Error occured');
            }
    
            res.json({
                exports: data
            })
        }) 
    }
})

app.post('/mappings', (req, res) => {
    console.log(req.body)
    MappingService.createMappings(req.body.mapping, (err, mapping) => {
        res.json({
            mapping
        })
    })
})

app.get('/mappings', (req, res) => {
    MappingService.getMappings((err, mappings) => {
        res.json({
            mappings
        })
    })
})

app.post('/runners', (req, res) => {
    const run = EngineService.run(req.body.runner, res).then(() => {
        console.log('done');
    });

    // res.json({
    //     done: true
    // })
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

app.post('/filter_courses', async (req, res) => {
    let data = await DataViewQuery(req);

    res.json({
        data
    });
})

app.post('/filter_users', async (req, res) => {
    let data = await UserViewQuery(req);

    res.json({
        data
    });
})

// Start a job



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

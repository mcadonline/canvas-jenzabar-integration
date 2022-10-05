require('dotenv').config()

const { initiateDb } = require('./utils/db');
const express = require('express');
const app = express()
const port = process.env.PORT || 3000;

initiateDb();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

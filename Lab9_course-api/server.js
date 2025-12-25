require('env').config(); 

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const dbUri = "mongodb://localhost:27017/courseManagementDB"

mongoose.connect(dbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); 
const coursesRouter = require('./routes/courseRouter');
app.use('/courses', coursesRouter);
app.get('/', (req, res) => {
    res.send('Welcome to the Course Management API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
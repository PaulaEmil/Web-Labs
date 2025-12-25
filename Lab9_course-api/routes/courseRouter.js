// routes/courseRouter.js

const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import the Course model

// --- MIDDLEWARE (for finding a course by ID) ---
async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id);
        if (course == null) {
            // 404 Not Found
            return res.status(404).json({ message: 'Cannot find course' });
        }
    } catch (err) {
        // 500 Server Error (e.g., invalid ID format)
        return res.status(500).json({ message: err.message });
    }

    res.course = course; // Attach the found course to the response object
    next(); // Move to the next middleware/route handler
}

// ------------------------------------------------------------------
// --- 1. GET ALL Courses (Read All) ---
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        // 500 Server Error
        res.status(500).json({ message: err.message });
    }
});

// --- 2. GET ONE Course (Read One) ---
router.get('/:id', getCourse, (req, res) => {
    res.json(res.course);
});

// --- 3. CREATE ONE Course ---
router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        instructorName: req.body.instructorName,
        price: req.body.price,
        category: req.body.category,
        // numberOfEnrolledStudents is optional, defaults to 0
    });

    try {
        const newCourse = await course.save();
        // 201 Created
        res.status(201).json(newCourse);
    } catch (err) {
        // 400 Bad Request (e.g., missing required fields, validation error)
        res.status(400).json({ message: err.message });
    }
});

// --- 4. UPDATE ONE Course (Patch) ---
// Note: Use 'patch' for partial updates. 'put' would replace the entire document.
router.patch('/:id', getCourse, async (req, res) => {
    // Only update fields that were actually passed in the request body
    if (req.body.title != null) {
        res.course.title = req.body.title;
    }
    if (req.body.description != null) {
        res.course.description = req.body.description;
    }
    if (req.body.price != null) {
        res.course.price = req.body.price;
    }
    // ... add checks for other fields

    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse);
    } catch (err) {
        // 400 Bad Request (e.g., validation error on updated fields)
        res.status(400).json({ message: err.message });
    }
});

// --- 5. DELETE ONE Course ---
router.delete('/:id', getCourse, async (req, res) => {
    try {
        // Mongoose v6+ uses deleteOne, findByIdAndDelete, etc.
        await Course.findByIdAndDelete(req.params.id); 
        // 200 OK
        res.json({ message: 'Deleted course' });
    } catch (err) {
        // 500 Server Error
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
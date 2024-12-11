// src/routes/carRoutes.js

const express = require('express');
const Car = require('../models/carModel');
const upload = require('../config/mutler'); // Corrected import path

const router = express.Router();

// POST /api/cars
router.post('/', upload.array('images', 8), async (req, res) => {
    console.log("Received POST /api/cars request");
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const { carModel, price, phoneNumber, numOfPictures } = req.body;
    const images = req.files.map(file => file.path);


    if (!carModel || !price || !phoneNumber || images.length > 8) {
        console.log("Validation Failed");
        return res.status(400).json({
            status: false,
            message: "Invalid input. Ensure car model, price, phone number, and images are provided correctly.",
        });
    }

    try {
        const newCar = new Car({
            carModel,
            price,
            phoneNumber,
            images,
        });

        await newCar.save();
        console.log("Car added successfully:", newCar);
        res.status(201).json({
            status: true,
            message: "Car added successfully",
            data: newCar,
        });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({
            status: false,
            message: "Error adding car",
            error: error.message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json({
            status: true,
            message: "Cars fetched successfully",
            data: cars,
        });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({
            status: false,
            message: "Error fetching cars",
            error: error.message,
        });
    }
});

module.exports = router;

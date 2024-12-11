const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'Email and password are required',
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                status: false,
                message: 'User not found',
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                statusCode: 401,
                status: false,
                message: 'Invalid credentials',
            });
        }


        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            statusCode: 200,
            status: true,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

module.exports = { loginUser };

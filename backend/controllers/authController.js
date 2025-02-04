const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isValidCredentials } = require('../utils/isValidCredentials');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: `Email cannot be empty`,
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: `Password cannot be empty`,
            })
        }

        try {
            isValidCredentials(password, email);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User is not found. Please signup`,
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id, },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: { _id: user._id, name: user.name, email: user.email },
                message: `Login Success`,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, dob } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, password) are required.",
            });
        }

        try {
            isValidCredentials(password, email);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            dob,
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            // data: { userId: user._id, email: user.email },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

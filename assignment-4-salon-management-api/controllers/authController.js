const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const supabase = require("../models/userModel");


const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const { data: existingUser, error: findError } =
            await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .maybeSingle();

        if (findError) {
            return res.status(500).json({
                message: findError.message
            });
        }

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    username,
                    email,
                    password: hashedPassword
                }
            ])
            .select()
            .single();

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: data.id,
                username: data.username,
                email: data.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect =
            await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser
};
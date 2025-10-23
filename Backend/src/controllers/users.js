import User from '../models/users.js';
import { generateToken,generateHash } from '../utils/generateTokens.js';
import bcrypt from 'bcryptjs';


const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 2️⃣ Hash password
    const hashedPassword = await generateHash(password);

    // 3️⃣ Create and save new user
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    // 4️⃣ Send response (DO NOT return hashed password in response)
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        email,
        name,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt for email:", email);
  
  try {

    const user = await User.findOne({ email });
      console.log("User found:", user);
      
    if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

          console.log("About to enter isMatch");
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match status:", isMatch);
    
    
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      
      return res.status(400).json({
        success: false,
        message: "Invalid credentials, Try Again",
      });

    }

    const token = generateToken(user._id);

    console.log("Generated token for user:", email, token);

    // 4️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        userId: user._id.toString(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Return currently authenticated user (populated by protect middleware)
const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    // req.user was set by auth middleware (without password)
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }
};


export default {
  signup,
  login,
  me
}
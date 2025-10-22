import User from '../models/users.js';
import { generateToken,generateHash } from '../utils/generateTokens.js';


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

  try {
    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2️⃣ Compare password securely
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Generate JWT (make sure generateToken returns token properly)
    const token = generateToken(user._id); // ✅ pass user._id or user.id only

    // 4️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
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


export default {
    signup,
    login
}
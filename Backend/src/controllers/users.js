import User from '../models/users.js';
import { generateToken,generateHash } from '../utils/generateTokens.js';


const signup = async (req, res) => {
    try{
        const { email, name, password } = req.body;
        
        const hashedPassword = await generateHash(password);
        const newUser = new User({ email, name, password: hashedPassword });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: { email, name, hashedPassword }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const isMatch = await becrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = generateToken(user);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { token }
        });
    } catch (error) {        
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};

export default {
    signup,
    login
}
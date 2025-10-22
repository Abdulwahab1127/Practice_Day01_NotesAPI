import becrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateHash = async (password) => {
    const salt = await becrypt.genSalt(10);
    const hashedPassword = await becrypt.hash(password, salt);
    return hashedPassword;
}

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export { generateHash, generateToken };
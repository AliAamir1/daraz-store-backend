import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/auth.js';

const validateUser = async (user, password) => {
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return { isValid: false, message: 'Invalid email or password' };
    }
    const public_user_data = {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
    };
    const access_token = generateAccessToken(public_user_data);
    const refresh_token = generateRefreshToken(public_user_data);

    return { access_token, refresh_token, isValid: true, message: 'Invalid email or password' }
}



export {validateUser}
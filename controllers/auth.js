import bcrypt from 'bcrypt';
import db from '../Database/connection.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/auth.js';
const { Users } = db;
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(Number(process.env.HASH_COST_FACTOR));
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({ username, email, password: hashedPassword, roles: ['user'] });

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log("user", user);
    const public_user_data = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    const access_token = generateAccessToken(public_user_data);
    const refresh_token = generateRefreshToken(public_user_data);

    res.json({ access_token, refresh_token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const refreshToken = (req, res) => {
  const refresh_token = req.header('Authorization');
  if (!refresh_token) {
    return res.sendStatus(401);
  }
  try {
    let user = verifyRefreshToken(refresh_token);

    delete user.iat;
    delete user.exp;

    const access_token = generateAccessToken(user);
    res.json({ access_token });
  } catch (error) {
    console.error(error);
    return res.sendStatus(403);
  }
};

const update_password = async (req, res) => {
  const { new_password, old_password, user_id } = req.body;
  const user = await Users.findOne({ where: { id: user_id } })

  if( new_password === user.password) {return res.status(400).json({ message: 'New Password Cannot Be same as Current Password' });} 
  if (!user) { return res.status(404).json({ message: 'User not found' }); }

  if (new_password.length < 4 ) {return res.status(400).json({ message: 'Password not strong enough' });} 

  
  const isPasswordValid = await bcrypt.compare(old_password, user.password);
  if(!isPasswordValid){return res.status(401).json({ message: 'old password not valid' });}

  const salt = await bcrypt.genSalt(Number(process.env.HASH_COST_FACTOR));
  user.password = await bcrypt.hash(new_password, salt)
  await user.save();
  return res.status(200).json({message: 'Password Updated Successfully'})
}

export { signup, login, refreshToken, update_password };

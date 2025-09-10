import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (it's in the format 'Bearer TOKEN')
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's payload (we stored the user id in it)
      // and attach it to the request object. Exclude the password.
      req.user = await User.findById(decoded.id).select('-password');
      
      // If user not found for that token, something is wrong
      if (!req.user) {
        return res.status(401).json({ msg: 'Not authorized, user not found' });
      }

      // Move on to the next function (the actual route controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

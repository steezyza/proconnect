import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User, { IUser } from '../../models/user.model';
import ApiError from '../../utils/ApiError';
import config from '../../config';

/**
 * Create a user
 */
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  if (await User.findOne({ email: userData.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userData);
};

/**
 * Login with username and password
 */
export const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<IUser> => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Generate JWT token
 */
export const generateAuthTokens = (user: IUser) => {
  const payload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
  };
  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes * 60,
  });

  return {
    access: {
      token: accessToken,
      expires: new Date(Date.now() + config.jwt.accessExpirationMinutes * 60 * 1000),
    },
  };
};

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import * as authService from './auth.service';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);
  const tokens = authService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = authService.generateAuthTokens(user);
  res.send({ user, tokens });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  // For JWT, logout is typically handled on the client-side by deleting the token.
  // If using refresh tokens, you would invalidate it here.
  res.status(httpStatus.NO_CONTENT).send();
});

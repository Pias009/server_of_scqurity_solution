import { ResponseDto } from '../../common/response';
import { catchAsync } from '../../middlewares/catch-async';
import { AuthService } from './auth.service';

const maxAge = 30 * 24 * 60 * 60 * 1000;

const register = catchAsync(async (req, res) => {
  const user = await AuthService.register(req.body);
  res.json(ResponseDto.success('User created successfully', user));
});

const login = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await AuthService.login(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge,
  });

  res.json(ResponseDto.success('Login successful', { user, accessToken }));
});

const changePassword = catchAsync(async (req, res) => {
  const userId = String(req.user.id);
  await AuthService.changePassword(userId, req.body);
  res.json(ResponseDto.success('Password changed successfully'));
});

const getAccessToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = await AuthService.getAccessToken(refreshToken);
  res.json(ResponseDto.success('Access token generated successfully', { accessToken }));
});

export const authController = {
  register,
  login,
  changePassword,
  getAccessToken,
};

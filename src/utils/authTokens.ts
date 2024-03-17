import Cookies from 'js-cookie';

export const setAuthTokens = (token: string, refreshToken: string) => {
  Cookies.set('access_token', token, { secure: true });
  Cookies.set('refresh_token', refreshToken, { secure: true });
};

export const removeAuthTokens = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

export const getRefreshToken = () => {
  const refresh_token = Cookies.get('refresh_token');
  return refresh_token ? refresh_token : '';
};
export const getAccessToken = () => {
  const access_token = Cookies.get('access_token');
  return access_token ? access_token : '';
};

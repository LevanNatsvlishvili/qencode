import axios, { AxiosError } from 'axios';
import { ForgotCredentials, User } from '@/types/User';
import axiosRemote from '@/utils/axios';

const baseUrl = 'https://auth-qa.qencode.com/v1';
const loginUrl = `${baseUrl}/auth/login`;
const accessTokenUrl = `${baseUrl}/auth/access-token`;
const refreshTokenUrl = `${baseUrl}/auth/refresh-token`;
const forgotPassUrl = `${baseUrl}/auth/password-reset`;
const healthCheckUrl = `https://auth-qa.qencode.com/healthcheck`;

export const login = async (form: User) => {
  try {
    const response = await axios.post(loginUrl, form);
    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response;
    }
    throw e;
  }
};
export const forgotPassword = async (form: ForgotCredentials) => {
  try {
    const response = await axios.post(forgotPassUrl, form);
    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response;
    }
    throw e;
  }
};

export const accessToken = async (accessToken: string) => {
  try {
    const response = await axios.post(accessTokenUrl, { access_id: accessToken });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response;
    }
    throw e;
  }
};
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axiosRemote.post(refreshTokenUrl, { refresh_token: refreshToken });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response;
    }
    throw e;
  }
};
export const healthCheck = async () => {
  try {
    const response = await axiosRemote.get(healthCheckUrl);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response;
    }
    throw e;
  }
};

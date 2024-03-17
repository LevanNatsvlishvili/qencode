export interface User {
  email: string;
  password: string;
}

export interface ForgotCredentials {
  email: string;
  redirect_url: string;
}
export interface ResetCredentials {
  token: string;
  secret: string;
  password: string;
  password_confirm: string;
}

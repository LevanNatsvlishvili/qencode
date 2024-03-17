import { useState } from 'react';
import { Logo } from '@/assets/icons/Logo';
import classes from './Login.module.css';
import Button from '@/components/Button';
import { Google } from '@/assets/icons/Google';
import { Github } from '@/assets/icons/Github';
import Input from '@/components/Input';
import { validateEmail, validatePassword } from '@/utils/form-validation';
import { Link, useNavigate } from 'react-router-dom';
import { paths } from '@/routing/Paths';
import { login } from '@/services/Auth';
import { User } from '@/types/User';
import { useAuth } from '@/context/userContext';
import { setAuthTokens } from '@/utils/authTokens';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<User>({
    email: 'test+ui@qencode.com',
    password: 'C4aLE2dRM7QE5mT*',
  });
  const { user, setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(credentials.email)) return;
    if (showPassword && !validatePassword(credentials.password)) return;

    setShowPassword(true);

    if (showPassword) {
      const res = await login(credentials);
      console.log(res);
      if (res?.data.error) {
        alert(res.data.detail);
      }
      if (res?.status === 200) {
        const { access_token, refresh_token } = res!.data;
        console.log('first', access_token);
        setUser({ isLoggedIn: true });
        setAuthTokens(access_token, refresh_token);
        navigate(paths.app.home);
      }
    }
  };

  console.log(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev: User) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <img src={Logo} alt="Logo" />

        <h1>Log in to your account</h1>

        <div className={classes.socMedia}>
          <Button icon={Google} text="Google" />
          <Button icon={Github} text="Github" />
        </div>

        <div className={classes.divider} />
        <form onSubmit={handleLogin} className={classes.fieldWrapper}>
          <Input placeholder="Work Email" value={credentials.email} type="email" name="email" onChange={handleChange} />
          {showPassword && (
            <div className={classes.passwordWrapper}>
              <Input
                placeholder="Password"
                type="password"
                value={credentials.password}
                name="password"
                onChange={handleChange}
              />
              <Link to={paths.auth.forgot} className={classes.forgot}>
                <span>Forgot your password?</span>
              </Link>
            </div>
          )}

          <div className={classes.buttonWrapper}>
            <Button text="Log in to Qencode" color="blue" />
          </div>
        </form>
        <p className={classes.signup}>
          Is your company new to Qencode? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;

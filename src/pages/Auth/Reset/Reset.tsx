import { useState } from 'react';
import { Logo } from '@/assets/icons/Logo';
import classes from './Reset.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { validatePassword, validatePasswordMatch } from '@/utils/form-validation';
import { ResetCredentials } from '@/types/User';

function Reset() {
  const [credentials, setCredentials] = useState<ResetCredentials>({
    password: '',
    password_confirm: '',
    token: '',
    secret: '',
  });

  const handleLogin = () => {
    // Check if the email is valid
    if (!validatePassword(credentials.password)) return;
    if (!validatePasswordMatch(credentials.password, credentials.password_confirm)) return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev: ResetCredentials) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <img src={Logo} alt="logo" />

        <h1>Create new Password?</h1>

        <div className={classes.fieldWrapper}>
          <Input
            placeholder="Password"
            value={credentials.password}
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            value={credentials.password_confirm}
            type="password"
            name="password_confirm"
            label="Repeat Password"
            onChange={handleChange}
          />
        </div>
        <div className={classes.buttonWrapper}>
          <Button text="Reset Password" color="blue" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default Reset;

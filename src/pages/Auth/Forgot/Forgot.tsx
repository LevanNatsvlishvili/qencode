import { useState } from 'react';
import { Logo } from '@/assets/icons/Logo';
import classes from './Forgot.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { validateEmail } from '@/utils/form-validation';
import { forgotPassword } from '@/services/Auth';
import { Link, useLocation } from 'react-router-dom';
import { ForgotCredentials } from '@/types/User';
import { paths } from '@/routing/Paths';

function Forgot() {
  const location = useLocation();
  const currentURL = window.location.origin + location.pathname;

  const [credentials, setCredentials] = useState<ForgotCredentials>({
    email: '',
    redirect_url: currentURL,
  });

  console.log(currentURL);

  const handleSendLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(credentials.email)) return;

    const res = await forgotPassword(credentials);
    if (res?.data.error) {
      alert(res.data.detail);
    }
    if (res?.status === 200) {
      alert(res.data.detail);
    }
    console.log(res);
  };

  return (
    <form onSubmit={handleSendLink} className={classes.wrapper}>
      <div className={classes.form}>
        <img src={Logo} />

        <h1>Forgot your password?</h1>

        <div className={classes.fieldWrapper}>
          <Input
            placeholder="Enter your Email"
            value={credentials.email}
            type="email"
            onChange={(e) => setCredentials((prev: ForgotCredentials) => ({ ...prev, email: e.target.value }))}
          />

          <div className={classes.buttonWrapper}>
            <Button text="Send" color="blue" onClick={() => handleSendLink} />
            <Link to={paths.auth.login}>
              <Button text="Cancel" />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Forgot;

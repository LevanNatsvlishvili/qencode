import { useState } from 'react';
import { Eye } from '@/assets/icons/Eye';
import classes from './Input.module.css';

interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  label?: string;
}

function InputField(props: InputProps) {
  const { value, onChange, placeholder, type, name, label } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.wrapper}>
      {!!label && <label className={classes.label}>{label}</label>}
      <div className={classes.inputField}>
        <input
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
        {type === 'password' && <img src={Eye} onClick={togglePasswordVisibility} />}
      </div>
    </div>
  );
}

export default InputField;

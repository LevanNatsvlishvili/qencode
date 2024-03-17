import classes from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  color: 'white' | 'blue';
  icon?: string;
}

Button.defaultProps = {
  color: 'white',
};

function Button(props: ButtonProps) {
  const { text, color, icon, onClick } = props;

  return (
    <button onClick={onClick} className={`${classes.btn} ${classes[color]}`}>
      {!!icon && <img src={icon} className={classes.icon} />}
      <span className={classes.label}>{text}</span>
    </button>
  );
}

export default Button;

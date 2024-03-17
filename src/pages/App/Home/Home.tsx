import Button from '@/components/Button';
import classes from './Home.module.css';
import useAuthActions from '@/utils/hooks/useAuthActions';

function Home() {
  const { handleLogout } = useAuthActions();
  return (
    <div className={classes.wrapper}>
      <Button onClick={handleLogout} color="blue" text="Log out" />
    </div>
  );
}

export default Home;

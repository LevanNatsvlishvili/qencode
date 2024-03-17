import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/userContext';
import { removeAuthTokens } from '@/utils/authTokens';

const useAuthActions = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ isLoggedIn: false });
    removeAuthTokens();
    navigate('/login');
  };

  return { handleLogout, navigate };
};
export default useAuthActions;

import { useAuth } from '@/context/userContext';
import { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { paths } from '@/routing/Paths';
import { getAccessToken } from '@/utils/authTokens';
// import parseJWT from '@/utils/parseJWT';
import useAuthActions from '@/utils/hooks/useAuthActions';
// import { accessToken } from '@/services/Auth';

// const handleCheckAccessToken = async (token: string) => {
//   const isTokenExpired = await accessToken(token);
//   console.log(isTokenExpired);
//   // return isTokenExpired;
// };

function AuthGuard() {
  const { user, setUser } = useAuth();
  const { handleLogout } = useAuthActions();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      handleLogout();
      setIsLoading(false);
      return;
    }

    // const decodedToken = parseJWT(token);
    // const isTokenExpired = handleCheckAccessToken(token);
    // console.log(isTokenExpired);

    // if (isTokenExpired) {
    //   // handleLogout();
    //   setIsLoading(false);
    //   return;
    // }

    if (!user.isLoggedIn) {
      setUser({ isLoggedIn: true });
    }
    setIsLoading(false);
  }, [user.isLoggedIn, setUser, handleLogout]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.isLoggedIn) {
    return <Navigate to={paths.auth.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default AuthGuard;

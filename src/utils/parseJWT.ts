import { jwtDecode } from 'jwt-decode';

function parseJWT(token: string) {
  const decoded = jwtDecode(token);
  return decoded;
}

export default parseJWT;

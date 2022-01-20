import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export const useLogout = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('user signed out');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { logout };
};

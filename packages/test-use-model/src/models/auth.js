import {
  useState,
  useCallback,
} from 'react';

export default () => {
  const [user, setUser] = useState(null);

  const signin = useCallback((name) => {
    setUser(name);
  }, []);

  const signout = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    signin,
    signout,
  };
};

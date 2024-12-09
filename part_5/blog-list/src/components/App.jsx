import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import loginService from '../services/login';
import HomePage from './HomePage';

// agerman, zqert!234984

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('blogListUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.error(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <HomePage user={user} handleLogout={handleLogout} />
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleUsername={(event) => setUsername(event.target.value)}
          handlePassword={(event) => setPassword(event.target.value)}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
};

export default App;

import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import Notification from './Notification';
import HomePage from './HomePage';
import loginService from '../services/login';
import blogService from '../services/blog';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState('');

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('blogListUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setMessage('Wrong username or password');
      setColor('red');

      setTimeout(() => {
        setMessage(null);
        setColor('');
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <>
          <h1>{user.name}&apos;s blogs</h1>
          {message !== null && <Notification message={message} color={color} />}
          <HomePage
            handleLogout={handleLogout}
            handleMessage={(message) => setMessage(message)}
            handleColor={(color) => setColor(color)}
          />
        </>
      ) : (
        <>
          <h1>Blog List Login</h1>
          {message !== null && (
            <Notification
              message={message}
              color={color}
              handleMessage={(message) => setMessage(message)}
              handleColor={(color) => setColor(color)}
            />
          )}
          <LoginForm
            username={username}
            password={password}
            handleUsername={(event) => setUsername(event.target.value)}
            handlePassword={(event) => setPassword(event.target.value)}
            handleLogin={handleLogin}
          />
        </>
      )}
    </>
  );
};

export default App;

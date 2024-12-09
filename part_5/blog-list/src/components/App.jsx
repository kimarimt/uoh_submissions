import { useState } from 'react';
import LoginForm from './LoginForm';
import loginService from '../services/login';
import HomePage from './HomePage';

// agerman, zqert!234984

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.error(exception);
    }
  };

  return (
    <>
      {user ? (
        <HomePage user={user} />
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

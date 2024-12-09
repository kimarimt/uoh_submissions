const LoginForm = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleLogin,
}) => {
  return (
    <div>
      <h1>Blog List Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

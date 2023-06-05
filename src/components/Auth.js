//Auth.js
import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const Auth = ({ type }) => {
  const { handleLogin, handleRegister, handleLogout, errorMessage, setErrorMessage, isLoggedIn, username } = useAuth();

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isCreator, setIsCreator] = useState(false);

  const isLoginView = type === "login";

  const validateForm = () => {
    const hasNumber = /\d/;

    return (
      usernameInput.length > 0 &&
      password.length > 8 &&
      (isLoginView || email.length > 0) &&
      hasNumber.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear the error message whenever form is submitted
    setErrorMessage("");
    if (isLoginView) {
      handleLogin(usernameInput, password);
    } else {
      handleRegister(usernameInput, password, email, isCreator);
    }
  };
  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoginView && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={isCreator}
                  onChange={(e) => setIsCreator(e.target.checked)}
                />
                Are you a Creator?
              </label>
            </>
          )}
          <button disabled={!validateForm()} type="submit">
            {isLoginView ? "Log in" : "Register"}
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default Auth;

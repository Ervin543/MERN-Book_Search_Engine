import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import SearchForm from './components/SearchForm';
import SavedBooks from './components/SavedBooks';
import NoMatch from './components/NoMatch';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { getToken, removeToken } from './utils/auth';
import { getMe } from './utils/API';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // check if there's a token in local storage
    const token = getToken();

    if (!token) {
      // if there's no token, set currentUser to null
      setCurrentUser(null);
      return;
    }

    // if there's a token, get the user data
    getMe(token)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((err) => {
        console.log(err);
        // if there's an error getting the user data, remove the token from local storage
        removeToken();
        setCurrentUser(null);
      });
  }, []);

  const handleLogout = () => {
    // remove the token from local storage
    removeToken();
    // set currentUser to null
    setCurrentUser(null);
  };

  return (
    <Router>
      <div>
        <Nav currentUser={currentUser} handleLogout={handleLogout} />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <SearchForm />
            </Route>
            <Route exact path="/saved">
              {currentUser ? (
                <SavedBooks currentUser={currentUser} />
              ) : (
                <LoginForm />
              )}
            </Route>
            <Route exact path="/signup">
              {currentUser ? <SearchForm /> : <SignUpForm />}
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

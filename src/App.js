import "./App.css";
import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./pages/login/Login";
import Board from "./pages/board/Board";
import { useSelector } from "react-redux";
import { getUser } from "./store/featured/userSlice";

function App() {
  const [user, setUser] = useState(null);
  const userSelected = useSelector(getUser);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  useEffect(() => {
    setUser(userSelected);
  }, [userSelected]);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={Board} />
      </Switch>
    </Router>
  );
}

export default App;

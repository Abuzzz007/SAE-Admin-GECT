import { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//Containers
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let route;
  if (isLoggedIn) {
    route = <Dashboard setIsLoggedIn={setIsLoggedIn} />;
  } else {
    route = (
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Redirect path="*" to="/" />
      </Switch>
    );
  }
  return route;
}

export default App;

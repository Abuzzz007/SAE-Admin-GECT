import { useLayoutEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
//Pages
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error from "./pages/Error/Error";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useLayoutEffect(() => {
    if (
      window.sessionStorage.getItem("isLoggedIn") === "true" ||
      window.localStorage.getItem("isLoggedIn") === "true"
    ) {
      setIsLoggedIn(true);
    }
  }, []);

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
        <Route path="*" component={Error} />
      </Switch>
    );
  }
  return route;
}

export default App;

import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
// Pages
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error from "./pages/Error/Error";
// Config
import firebaseConfig from "./config/firebase.config";

firebase.initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (
      window.sessionStorage.getItem("auth_data") ||
      window.localStorage.getItem("auth_data")
    ) {
      loginHandler();
    } else {
      let loader = document.getElementById("loading-spinner");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
    }
  }, []);

  const resize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  resize();

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const loginHandler = () => {
    let localData = window.localStorage.getItem("auth_data");
    if (!localData) localData = window.sessionStorage.getItem("auth_data");
    localData = JSON.parse(localData);

    firebase
      .auth()
      .signInWithEmailAndPassword(localData.email, localData.password)
      .then(() => {
        setIsLoggedIn(true);
        let loader = document.getElementById("loading-spinner");
        if (loader) {
          loader.style.opacity = "0";
          setTimeout(() => {
            loader.remove();
          }, 500);
        }
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          window.sessionStorage.clear();
          window.localStorage.clear();
          let loader = document.getElementById("loading-spinner");
          if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
              loader.remove();
            }, 500);
          }
        }
      });
  };

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

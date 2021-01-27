import { useEffect, useState } from "react";
//Images
import logo from "../../assets/logo192.png";
//Components
import Loader from "../../components/Loaders/LoginLoader";

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [valid, setValid] = useState({
    email: true,
    password: true,
    eContent: "",
    pContent: "",
  });
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);

  const resize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
  }, []);

  const formHandler = (e) => {
    if (e.target.id !== "remember") {
      setState({ ...state, [e.target.id]: e.target.value });
    } else {
      setState({ ...state, remember: !state.remember });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // form validation
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let Valid = true;
    let Validobj = { ...valid };
    if (state.email === "") {
      Validobj = { ...Validobj, email: false, eContent: "Email is required" };
      Valid = false;
    } else if (!re.test(String(state.email).toLowerCase())) {
      Validobj = {
        ...Validobj,
        email: false,
        eContent: "Enter valid email id",
      };
      Valid = false;
    } else {
      Validobj = { ...Validobj, email: true, eContent: "" };
    }
    if (state.password === "") {
      Validobj = {
        ...Validobj,
        password: false,
        pContent: "Password is required",
      };
      Valid = false;
    } else {
      Validobj = { ...Validobj, password: true, pContent: "" };
    }
    setValid(Validobj);
    if (!Valid) return;

    if (state.remember) {
      window.localStorage.setItem("isLoggedIn", "true");
    } else {
      window.sessionStorage.setItem("isLoggedIn", "true");
    }
    props.setIsLoggedIn("true");
  };

  return (
    <>
      <div className="w-full h-full bg-gray-900">
        <div
          className="absolute w-screen h-screen bg-gray-900"
          style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        ></div>
        <div className="container mx-auto px-4" style={{ paddingTop: "5vh" }}>
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full sm:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <img className="mx-auto" src={logo} alt="logo" />
                <div className="flex-auto px-4 py-10 pt-0 relative">
                  {isLoading ? <Loader /> : ""}
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    Log In
                  </div>
                  <form autoComplete="off" spellCheck="false">
                    <div className="relative w-full mb-5">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        value={state.email}
                        onChange={formHandler}
                      />
                      {valid.email ? (
                        ""
                      ) : (
                        <div className="text-red-600 text-xs -mb-4">
                          <i className="fas fa-exclamation-triangle mx-1"></i>
                          {valid.eContent}
                        </div>
                      )}
                    </div>

                    <div className="relative w-full mb-5">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        value={state.password}
                        onChange={formHandler}
                      />
                      {valid.password ? (
                        ""
                      ) : (
                        <div className="text-red-600 text-xs -mb-4">
                          <i className="fas fa-exclamation-triangle mx-1"></i>
                          {valid.pContent}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="remember"
                          type="checkbox"
                          className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          value={state.remember}
                          onChange={formHandler}
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">
                          Remember me
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-800 text-white hover:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        onClick={(e) => submitHandler(e)}
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

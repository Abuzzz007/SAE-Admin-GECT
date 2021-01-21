import { useState } from "react";
import { useHistory } from "react-router-dom";
//Images
import logo from "../../assets/logo192.png";

function Sidebar(props) {
  const history = useHistory();
  const [route, setRoute] = useState(history.location.pathname);
  if (route !== "/gallery" && route !== "/news") {
    history.push("/gallery");
    setRoute("/gallery");
  }

  let selected =
    "py-2 px-4 md:px-8 w-full focus:outline-none bg-gray-700 text-gray-100 border-r-4 border-gray-100";
  let unselected =
    "py-2 px-4 md:px-8 w-full focus:outline-none text-gray-400 border-r-4 border-gray-800 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-100";

  return (
    <div className="w-14 md:w-64 h-screen bg-gray-900 fixed top-0 left-0 overflow-auto">
      <div className="flex items-center justify-center mt-10">
        <img className="w-9 md:w-12" src={logo} alt="Logo" />
        <h1 className="text-gray-100 text-2xl mb-3 ml-2 md:block hidden">
          Admin
        </h1>
      </div>

      <nav className="mt-10">
        <button
          className={
            "flex items-center " +
            (route === "/gallery" ? selected : unselected)
          }
          onClick={() => {
            history.push("/gallery");
            setRoute("/gallery");
          }}
        >
          <i className="far fa-images"></i>
          <span className="mx-4 font-medium md:block hidden">Gallery</span>
        </button>

        <button
          className={
            "flex items-center mt-5 " +
            (route === "/news" ? selected : unselected)
          }
          onClick={() => {
            history.push("/news");
            setRoute("/news");
          }}
        >
          <i className="far fa-newspaper"></i>
          <span className="mx-4 font-medium md:block hidden">News</span>
        </button>

        <button
          className={"flex items-center mt-5 " + unselected}
          onClick={() => props.setIsLoggedIn(false)}
        >
          <i className="fas fa-power-off"></i>
          <span className="mx-4 font-medium md:block hidden">Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;

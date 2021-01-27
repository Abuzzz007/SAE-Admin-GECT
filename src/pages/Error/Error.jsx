import { useHistory } from "react-router-dom";
import Forbidden from "../../assets/Forbidden.svg";

function Error() {
  const history = useHistory();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  return (
    <div
      className="h-screen w-screen bg-gray-200 flex items-center"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-800 m-auto">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">403, Forbidden</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry, you don't have permission to access this page
          </p>
          <p className="mb-8">Please Log In to continue.</p>

          <button
            className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-gray-800 hover:bg-gray-600"
            onClick={() => history.push("/")}
          >
            Back to Log In
          </button>
        </div>
        <div className="max-w-lg">
          <img
            src={Forbidden}
            alt="Forbidden"
            className="hidden md:block w-64"
          />
        </div>
      </div>
    </div>
  );
}

export default Error;

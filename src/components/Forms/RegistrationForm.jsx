import { useState } from "react";
import firebase from "firebase/app";
// import "firebase/database";
//Components
import Loader from "../Loaders/FormLoader";

function RegistrationForm(props) {
  const [state, setState] = useState({
    link: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const formHandler = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const addData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    firebase
      .database()
      .ref("/reg/")
      .push(
        {
          link: state.link,
        },
        (err) => {
          if (!err) {
            props.setAlert({
              type: "success",
              title: "Saved successfully",
              content: "",
            });
            props.fetchData();
            props.setAddNew(false);
          } else {
            props.setAlert({
              type: "danger",
              title: "Error!",
              content: "Sorry you don't have access",
            });
            setIsLoading(false);
          }
        }
      );
  };

  const formSubmit = (e) => {
    e.preventDefault();

    let content = "";
    if (state.link === "") {
      content = "Link is required";
    }

    if (content !== "") {
      props.setAlert({
        type: "danger",
        title: "Error!",
        content: content,
      });
      return;
    }

    // add data to database
    addData();
  };

  const formCancel = (e) => {
    e.preventDefault();
    props.setAlert("");
    props.setAddNew(false);
  };

  return (
    <>
      <div className="mt-5 md:col-span-2">
        <form>
          <div className="shadow rounded-md sm:overflow-hidden relative">
            {isLoading ? <Loader uploadPercent={uploadPercent} /> : ""}
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="link"
                      id="link"
                      className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                      placeholder="Registration link"
                      autoComplete="off"
                      value={state.title}
                      onChange={formHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={(e) => formSubmit(e)}
              >
                Save
              </button>
              <button
                className="inline-flex justify-center py-2 px-4 ml-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                onClick={(e) => formCancel(e)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;

import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import Loader from "../Loaders/FormLoader";

function ContactForm(props) {
  const [state, setState] = useState({
    name: "",
    phno: "",
  });
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    if (props.Key) {
      setEdit(true);
      setState({
        name: props.name,
        phno: props.phno,
      });
    }
  }, [props.Key, props.name, props.phno]);

  const formHandler = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const addData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    firebase
      .database()
      .ref("/contact/")
      .push(
        {
          name: state.name,
          phno: state.phno,
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

  const editData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    firebase
      .database()
      .ref("/contact/" + props.Key)
      .update(
        {
          name: state.name,
          phno: state.phno,
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
    if (state.name === "") {
      content = "Name is required";
    } else if (state.phno === "") {
      content = "Phone no is required";
    }

    if (content !== "") {
      props.setAlert({
        type: "danger",
        title: "Error!",
        content: content,
      });
      return;
    }

    // add or edit data
    if (edit) editData();
    else addData();
  };

  const formCancel = (e) => {
    e.preventDefault();
    props.setAlert("");
    props.setAddNew(false);
  };

  return (
    <>
      <div>
        <form autoComplete="off">
          <div className="relative">
            {isLoading ? <Loader uploadPercent={uploadPercent} /> : ""}

            <div className="bg-white mb-5 sm:mb-0 rounded-lg sm:rounded-none overflow-hidden relative">
              <div className="px-6 py-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter name"
                    value={state.name}
                    onChange={formHandler}
                    autoFocus
                  />
                </div>

                <label
                  htmlFor="phno"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Phone no
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="phno"
                    id="phno"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter phone no"
                    value={state.phno}
                    onChange={formHandler}
                  />
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-300">
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
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;

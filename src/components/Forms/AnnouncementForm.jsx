import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import Loader from "../Loaders/FormLoader";

function AnnouncementForm(props) {
  const [state, setState] = useState({
    message: "",
    link: "",
  });
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    if (props.Key) {
      setEdit(true);
      setState({
        message: props.message,
        link: props.link,
      });
    }
  }, [props]);

  const formHandler = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const addData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    firebase
      .database()
      .ref("/announcement/")
      .push(
        {
          message: state.message,
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

  const editData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    firebase
      .database()
      .ref("/announcement/" + props.Key)
      .update(
        {
          message: state.message,
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

    const re = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    let content = "";
    if (state.message === "") {
      content = "Message is required";
    } else if (state.link === "") {
      content = "Link is required";
    } else if (!re.test(state.link)) {
      content = "Enter a valid link";
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
          <div className="shadow rounded-md sm:overflow-hidden relative">
            {isLoading ? <Loader uploadPercent={uploadPercent} /> : ""}

            <div className="rounded overflow-hidden shadow-lg bg-white relative">
              <div className="px-6 py-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <textarea
                    name="message"
                    id="message"
                    rows="2"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter message"
                    value={state.message}
                    onChange={formHandler}
                    autoFocus
                  ></textarea>
                </div>

                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Link
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="link"
                    id="link"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter link"
                    value={state.link}
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

export default AnnouncementForm;

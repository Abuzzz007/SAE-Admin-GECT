import { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
//Components
import Modal from "../Modals/ImageModal";
import Loader from "../Loaders/FormLoader";

function EventsForm(props) {
  const [state, setState] = useState({
    title: "",
    date: new Date().toISOString().substr(0, 10),
    content: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (!file) {
      return;
    } else if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/gif"
    ) {
      props.setAlert({
        type: "danger",
        title: "Error!",
        content: "Unsupported file type",
      });
      return;
    }
    setState({ ...state, image: file });
  };

  const formHandler = (e) => {
    if (e.target.id === "image-upload") {
      let file = e.target.files[0];
      if (!file) {
        return;
      } else if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif"
      ) {
        props.setAlert({
          type: "danger",
          title: "Error!",
          content: "Unsupported file type",
        });
        return;
      }
      setState({ ...state, image: file });
    } else {
      setState({ ...state, [e.target.id]: e.target.value });
    }
  };

  const addData = () => {
    setIsLoading(true);

    let fileName = String(Number(new Date())) + state.image.name;
    let uploadTask = firebase
      .storage()
      .ref("/events/" + fileName)
      .put(state.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadPercent(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        props.setAlert({
          type: "danger",
          title: "Error!",
          content: "Sorry, you don't have access",
        });
        setIsLoading(false);
      },
      () => {
        setTimeout(() => {
          setUploadPercent(101);
        }, 500);
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          firebase
            .database()
            .ref("/events/")
            .push(
              {
                title: state.title,
                date: state.date,
                content: state.content,
                fileName: fileName,
                imageUrl: url,
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
        });
      }
    );
  };

  const formSubmit = (e) => {
    e.preventDefault();

    let content = "";
    if (state.title === "") {
      content = "Title is required";
    } else if (state.date === "") {
      content = "Date is required";
    } else if (state.content === "") {
      content = "Content is required";
    } else if (!state.image) {
      content = "Cover photo is required";
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
      {showModal ? (
        <Modal setShowModal={setShowModal} image={state.image} />
      ) : (
        ""
      )}
      <div className="mt-5 md:col-span-2">
        <form>
          <div className="shadow rounded-md sm:overflow-hidden relative">
            {isLoading ? <Loader uploadPercent={uploadPercent} /> : ""}
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                      placeholder="Title"
                      autoComplete="off"
                      value={state.title}
                      onChange={formHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="focus:border-gray-800 flex-1 block w-full bg-white rounded-md sm:text-sm border-gray-300 border p-3"
                      value={state.date}
                      onChange={formHandler}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows="3"
                    className="shadow-sm focus:border-gray-800 mt-1 block w-full sm:text-sm border-gray-300 border rounded-md p-3"
                    placeholder="Enter event content"
                    value={state.content}
                    onChange={formHandler}
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                  {state.image ? (
                    <>
                      <span className="font-thin italic text-gray-500 pl-2">
                        Added!!
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => setShowModal(true)}
                      >
                        {" (View image)"}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </label>
                <div
                  className="mt-2 flex justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDragOver={dragOver}
                  onDrop={drop}
                >
                  <div className="text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-white rounded-md font-medium text-gray-800 hover:text-gray-600 focus:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          onChange={formHandler}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
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

export default EventsForm;

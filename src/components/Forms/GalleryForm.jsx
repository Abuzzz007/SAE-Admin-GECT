import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
//Components
import Modal from "../Modals/ImageModal";
import Loader from "../Loaders/FormLoader";
//Images
import DummyBg from "../../assets/dummyBg.png";

function GalleryForm(props) {
  const [state, setState] = useState({
    priority: "",
    image: "",
    imageUrl: DummyBg,
  });
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    if (props.Key) {
      setEdit(true);
      setState({
        priority: props.priority,
        image: "",
        imageUrl: props.imageUrl,
      });
    }
  }, [props.Key, props.priority, props.imageUrl]);

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
    setState({ ...state, image: file, imageUrl: URL.createObjectURL(file) });
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
      setState({ ...state, image: file, imageUrl: URL.createObjectURL(file) });
    } else {
      setState({ ...state, [e.target.id]: e.target.value });
    }
  };

  const addData = () => {
    setIsLoading(true);

    let fileName = String(Number(new Date())) + state.image.name;
    let uploadTask = firebase
      .storage()
      .ref("/gallery/" + fileName)
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
            .ref("/gallery/")
            .push(
              {
                priority: state.priority,
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

  const editData = () => {
    setIsLoading(true);

    if (state.image === "") {
      //if no change in image
      setUploadPercent(101);
      firebase
        .database()
        .ref("/gallery/" + props.Key)
        .update(
          {
            priority: state.priority,
            fileName: props.fileName,
            imageUrl: props.imageUrl,
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
    } else {
      //if image changed
      firebase
        .storage()
        .ref("/gallery/" + props.fileName)
        .delete()
        .then(() => {
          let fileName = String(Number(new Date())) + state.image.name;
          let uploadTask = firebase
            .storage()
            .ref("/gallery/" + fileName)
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
                  .ref("/gallery/" + props.Key)
                  .update(
                    {
                      priority: state.priority,
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
        })
        .catch(() =>
          props.setAlert({
            type: "danger",
            title: "Error!",
            content: "Sorry, you don't have access",
          })
        );
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();

    let content = "";
    if (!edit) {
      if (state.priority === "") {
        content = "Priority no is required";
      } else if (!state.image) {
        content = "Image is required";
      }
    } else {
      if (state.priority === "") {
        content = "Priority no is required";
      }
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
      {showModal ? (
        <Modal setShowModal={setShowModal} imageUrl={state.imageUrl} />
      ) : (
        ""
      )}
      <div>
        <form>
          <div className="shadow rounded-md sm:overflow-hidden relative">
            {isLoading ? <Loader uploadPercent={uploadPercent} /> : ""}

            <div className="rounded overflow-hidden shadow-lg bg-white relative">
              <div className="relative" style={{ minHeight: "9rem" }}>
                <img
                  className="w-full"
                  src={state.imageUrl}
                  alt={state.fileName}
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <div
                    className="m-4 absolute inset-0 flex justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDragOver={dragOver}
                    onDrop={drop}
                  >
                    <div className="text-center h-full flex items-center">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                      >
                        <div className="flex">
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer text-bold text-base rounded-md font-medium text-green-400 hover:text-green-500 focus:outline-none"
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
                          <p className="pl-1 text-gray-200">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-200">PNG, JPG, GIF</p>
                        <span
                          className="cursor-pointer text-white"
                          onClick={() => setShowModal(true)}
                        >
                          {"(View image)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority No
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="priority"
                    id="priority"
                    className="focus:border-gray-800 flex-1 block w-full bg-white rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter priority no"
                    value={state.priority}
                    onChange={formHandler}
                    autoFocus
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

export default GalleryForm;

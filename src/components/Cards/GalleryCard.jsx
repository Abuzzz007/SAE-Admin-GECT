import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";
import GalleryForm from "../Forms/GalleryForm";

function GalleryCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const deleteCard = () => {
    setShowModal(false);
    firebase
      .storage()
      .ref("/gallery/" + props.fileName)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("/gallery/" + props.Key)
          .remove()
          .then(() => {
            props.fetchData();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) =>
        props.setAlert({
          type: "danger",
          title: "Error!",
          content: "Sorry, you don't have access",
        })
      );
  };

  return (
    <>
      {showModal ? (
        <DeleteModal
          message="Are you sure you want to delete this image?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}

      {!edit ? (
        <div className="rounded overflow-hidden shadow-lg bg-white relative">
          <button
            title="Edit Image"
            className="absolute text-sm bg-gray-100 focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100 border border-gray-300"
            onClick={() => setEdit(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            title="Delete Image"
            className="absolute text-sm bg-gray-100 focus:outline-none text-red-600 rounded-lg p-2 opacity-80 right-1 top-1 hover:opacity-100 border border-gray-300"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <div className="absolute text-sm bg-gray-100 text-black rounded-lg p-2 opacity-90 left-1 top-1 hover:opacity-100">
            <i className="far fa-eye"></i> {props.priority}
          </div>
          <img className="w-full" src={props.imageUrl} alt={props.fileName} />
        </div>
      ) : (
        <GalleryForm
          setAlert={props.setAlert}
          fetchData={props.fetchData}
          setAddNew={setEdit}
          Key={props.Key}
          priority={props.priority}
          imageUrl={props.imageUrl}
          fileName={props.fileName}
        />
      )}
    </>
  );
}

export default GalleryCard;

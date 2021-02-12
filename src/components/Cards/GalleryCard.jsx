import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function GalleryCard(props) {
  const [showModal, setShowModal] = useState(false);

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
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide relative">
        <button
          className="absolute text-sm bg-gray-800 hover:bg-gray-500 focus:outline-none text-white rounded-lg p-2 opacity-90 right-1 top-1"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
        <div className="md:flex-shrink-0">
          <img
            src={props.imageUrl}
            alt={props.fileName}
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default GalleryCard;

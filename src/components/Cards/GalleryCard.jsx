import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function GalleryCard(props) {
  const [showModal, setShowModal] = useState(false);

  const editCard = () => {
    console.log("Edit mode" + props.Key);
  };

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

      <div className="rounded overflow-hidden shadow-lg bg-white relative">
        <button
          title="Edit Image"
          className="absolute text-sm bg-gray-100 focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100 border border-gray-300"
          onClick={() => editCard()}
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
        <img className="w-full" src={props.imageUrl} alt={props.fileName} />
      </div>
    </>
  );
}

export default GalleryCard;

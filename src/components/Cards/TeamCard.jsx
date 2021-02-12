import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function TeamCard(props) {
  const [showModal, setShowModal] = useState(false);

  const deleteCard = () => {
    setShowModal(false);
    firebase
      .storage()
      .ref("/team/" + props.fileName)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("/team/" + props.Key)
          .remove()
          .then(() => {
            props.fetchData();
          })
          .catch((err) => console.error(err));
      })
      .catch(() =>
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
          message="Are you sure you want to delete this member?"
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
        <div className="absolute text-sm bg-gray-800 hover:bg-gray-500 text-white rounded-lg p-2 opacity-90 left-1 top-1">
          <i className="fas fa-user-tie"></i> {props.priority}
        </div>
        <div className="md:flex-shrink-0">
          <img
            src={props.imageUrl}
            alt={props.fileName}
            className="w-full rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <h2 className="font-bold text-2xl text-gray-800 text-center uppercase tracking-normal">
            {props.name}
          </h2>
          <p className="text-md text-center text-gray-900 px-2 mt-1 mb-2">
            {props.position}
          </p>
        </div>
      </div>
    </>
  );
}

export default TeamCard;

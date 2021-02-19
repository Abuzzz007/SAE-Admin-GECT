import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function MessagesCard(props) {
  const [showModal, setShowModal] = useState(false);

  const deleteCard = () => {
    setShowModal(false);

    firebase
      .database()
      .ref("/messages/" + props.Key)
      .remove()
      .then(() => {
        props.fetchData();
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
          message="Are you sure you want to delete this message?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}

      <div className="rounded overflow-hidden shadow-lg bg-white relative">
        <button
          title="Delete Message"
          className="absolute text-sm bg-gray-100 focus:outline-none text-red-600 rounded-lg p-2 opacity-80 right-1 top-1 hover:opacity-100 border border-gray-300"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <div className="pl-6 pr-9 py-4">
          <p className="text-gray-700 text-base whitespace-pre-line">
            {props.message}
          </p>
          <div className="text-sm pt-5">
            <p className="text-gray-900 font-medium text-base">
              <span className="text-gray-600 font-normal text-sm">By</span>
              {" " + props.name}
            </p>
            <a href={`mailto:${props.email}`}>
              <p className="text-gray-700 hover:text-gray-500 hover:underline">
                {props.email}
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagesCard;

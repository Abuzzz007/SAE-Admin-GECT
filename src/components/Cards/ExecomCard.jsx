import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";
import ExecomForm from "../Forms/ExecomForm";

function ExecomCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const deleteCard = () => {
    setShowModal(false);
    firebase
      .storage()
      .ref("/execom/" + props.fileName)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("/execom/" + props.Key)
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

      {!edit ? (
        <div className="rounded overflow-hidden shadow-lg bg-white relative">
          <button
            title="Edit Member"
            className="absolute text-sm bg-gray-100 focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100 border border-gray-300"
            onClick={() => setEdit(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            title="Delete Member"
            className="absolute text-sm bg-gray-100 focus:outline-none text-red-600 rounded-lg p-2 opacity-80 right-1 top-1 hover:opacity-100 border border-gray-300"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <div className="absolute text-sm bg-gray-100 text-black rounded-lg p-2 opacity-90 left-1 top-1 hover:opacity-100">
            <i className="fas fa-user-tie"></i> {props.priority}
          </div>
          <img className="w-full" src={props.imageUrl} alt={props.fileName} />
          <div
            className="px-3 py-1 absolute bottom-0 w-full text-white"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7206232834930848) 60%, rgba(0,0,0,0) 100%)",
            }}
          >
            <div className="font-bold text-xl">{props.name}</div>
            <p className="text-base">{props.position}</p>
          </div>
        </div>
      ) : (
        <ExecomForm
          setAlert={props.setAlert}
          fetchData={props.fetchData}
          setAddNew={setEdit}
          Key={props.Key}
          name={props.name}
          position={props.position}
          priority={props.priority}
          imageUrl={props.imageUrl}
          fileName={props.fileName}
        />
      )}
    </>
  );
}

export default ExecomCard;

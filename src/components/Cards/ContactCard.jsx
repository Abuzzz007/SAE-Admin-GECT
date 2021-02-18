import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";
import ContactForm from "../Forms/ContactForm";

function ContactCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const deleteCard = () => {
    setShowModal(false);
    firebase
      .database()
      .ref("/contact/" + props.Key)
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
          message="Are you sure you want to delete this contact?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}

      {!edit ? (
        <div className="relative">
          <button
            title="Edit"
            className="absolute text-sm bg-white focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100 border border-gray-300"
            onClick={() => setEdit(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            title="Delete"
            className="absolute text-sm bg-white focus:outline-none text-red-600 rounded-lg p-2 opacity-80 right-1 top-1 hover:opacity-100 border border-gray-300"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>

          <div className="grid grid-cols-3 bg-white shadow rounded-lg sm:rounded-none mb-5 sm:mb-0">
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase rounded-tl-lg border-r border-b border-gray-200">
              Name
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-1 border-b sm:border-r border-gray-200">
              <div className="text-sm font-medium text-gray-900">
                {props.name}
              </div>
            </div>
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase rounded-bl-lg border-r border-gray-200">
              Phone no / email
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-2 sm:border-b border-gray-200">
              <div className="text-sm text-gray-900">{props.phno}</div>
            </div>
          </div>
        </div>
      ) : (
        <ContactForm
          setAlert={props.setAlert}
          fetchData={props.fetchData}
          setAddNew={setEdit}
          Key={props.Key}
          name={props.name}
          phno={props.phno}
        />
      )}
    </>
  );
}

export default ContactCard;

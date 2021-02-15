import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState, useEffect } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function RegistrationCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [metadata, setMetadata] = useState("");

  //fetching for  metadata
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `https://graph.facebook.com/v9.0/?scrape=true&id=${props.link}&access_token=182802870306864%7Czx7V2wAxFcAJZtZg-vCgqFvoWG0`,
      {
        method: "POST",
        signal: signal,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) setMetadata(result);
      })
      .catch((error) => {
        if (error.message !== "The user aborted a request.")
          console.error(error);
      });

    return () => controller.abort();
  }, [props]);

  const editCard = () => {
    console.log("Edit mode" + props.Key);
  };

  const deleteCard = () => {
    setShowModal(false);

    firebase
      .database()
      .ref("/reg/" + props.Key)
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
          message="Are you sure you want to delete this link?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}

      <div className="rounded overflow-hidden shadow-lg bg-white relative">
        {metadata ? (
          <div className="bg-gray-100 w-full sm:max-w-full sm:flex border-b border-gray-300">
            <div
              className="h-48 sm:h-auto sm:w-48 flex-none bg-cover rounded-t sm:rounded-t-none sm:rounded-l text-center overflow-hidden bg-center"
              style={{
                backgroundImage: `url(${metadata.image[0].url})`,
              }}
            ></div>
            <div className="rounded-b sm:rounded-b-none sm:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {metadata.title}
                </div>
                <p className="text-gray-700 text-base">
                  {metadata.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <button
          title="Edit Link"
          className="absolute text-sm bg-white focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100 border border-gray-300"
          onClick={() => editCard()}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          title="Delete Link"
          className="absolute text-sm bg-white focus:outline-none text-red-600 rounded-lg p-2 opacity-80 right-1 top-1 hover:opacity-100 border border-gray-300"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <div className="px-6 py-4 mr-12">
          <a href={props.link} target="_blank" rel="noreferrer">
            <p className="text-base break-all text-blue-700 hover:text-blue-400">
              {props.link}
            </p>
          </a>
        </div>
      </div>
    </>
  );
}

export default RegistrationCard;

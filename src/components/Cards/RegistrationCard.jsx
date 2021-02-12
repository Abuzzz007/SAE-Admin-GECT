import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useEffect, useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function EventsCard(props) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(props.link, {
      method: "GET",
      redirect: "follow",
      headers: {
        origin: "google.com",
      },
    })
      .then((res) => {
        console.log(res);
        return res.text();
      })
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        console.log(doc);
      });

    // fetch("https://cors-anywhere.herokuapp.com/" + props.link, {})
    //   .then((res) => {
    //     console.log(res);
    //     return res.text();
    //   })
    //   .then((html) => {
    //     let parser = new DOMParser();
    //     let doc = parser.parseFromString(html, "text/html");
    //     console.log(doc);
    //   });
  }, [props]);

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
          message="Are you sure you want to delete this event?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide relative">
        <button
          className="absolute text-sm bg-gray-800 hover:bg-gray-500 focus:outline-none text-white rounded-lg p-1 opacity-90 right-1 top-1"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>

        <div className="px-4 py-2">
          <a href={props.link} target="_blank" rel="noreferrer">
            <p className="text-md text-gray-900 px-2 mr-14">{props.link}</p>
          </a>
        </div>
      </div>
    </>
  );
}

export default EventsCard;

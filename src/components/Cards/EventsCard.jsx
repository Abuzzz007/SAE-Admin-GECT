import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function EventsCard(props) {
  const [showModal, setShowModal] = useState(false);

  // editing date
  let date, mon, year;
  date = props.date.substr(8, 2);
  mon = props.date.substr(5, 2);
  year = props.date.substr(0, 4);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  mon = monthNames[Number(mon) - 1];
  date = date + " " + mon + " " + year;

  const deleteCard = () => {
    setShowModal(false);
    firebase
      .storage()
      .ref("/events/" + props.fileName)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("/events/" + props.Key)
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
          message="Are you sure you want to delete this event?"
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
            className="w-full rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <h2 className="font-bold text-2xl text-gray-800 text-center tracking-normal">
            {props.title}
          </h2>
          <div className="text-sm tracking-tighter">
            <h2 className="text-gray-600 text-right mr-4">Date: {date}</h2>
          </div>
          <p className="text-md text-gray-900 px-2 mt-2">{props.content}</p>
        </div>
      </div>
    </>
  );
}

export default EventsCard;

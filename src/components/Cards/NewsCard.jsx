import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";

function NewsCard(props) {
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

  const editCard = () => {
    console.log("Edit mode" + props.Key);
  };

  const deleteCard = () => {
    setShowModal(false);
    firebase
      .storage()
      .ref("/news/" + props.fileName)
      .delete()
      .then(() => {
        firebase
          .database()
          .ref("/news/" + props.Key)
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
          message="Are you sure you want to delete this news?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}

      <div className="rounded overflow-hidden shadow-lg bg-white relative">
        <button
          title="Edit News"
          className="absolute text-sm bg-gray-100 focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100 border border-gray-300"
          onClick={() => editCard()}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          title="Delete News"
          className="absolute text-sm bg-gray-100 focus:outline-none text-red-600 rounded-lg p-2 opacity-80 right-1 top-1 hover:opacity-100 border border-gray-300"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <img className="w-full" src={props.imageUrl} alt={props.fileName} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl">{props.title}</div>
          <h2 className="text-gray-600 text-xs text-right">Date: {date}</h2>
          <p className="text-gray-700 text-base">{props.content}</p>
        </div>
      </div>
    </>
  );
}

export default NewsCard;

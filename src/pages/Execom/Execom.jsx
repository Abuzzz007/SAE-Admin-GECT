import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import ExecomCard from "../../components/Cards/ExecomCard";
import ExecomForm from "../../components/Forms/ExecomForm";
import ExecomYearForm from "../../components/Forms/ExecomYearForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";
import DeleteModal from "../../components/Modals/DeleteModal";

function Execom() {
  const [year, setYear] = useState("");
  const [yearKey, setYearKey] = useState("");
  const [editYear, setEditYear] = useState(false);
  const [data, setData] = useState(null);
  const [keys, setKeys] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchYear();
    fetchData();
  }, []);

  const fetchYear = () => {
    firebase
      .database()
      .ref("/execom-year/")
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        if (data) {
          setYear(Object.values(data)[0].year);
          setYearKey(Object.keys(data)[0]);
        }
      });
  };

  const fetchData = () => {
    setIsLoading(true);
    firebase
      .database()
      .ref("/execom/")
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        if (data) {
          let sortedData = Object.fromEntries(
            Object.entries(data).sort((a, b) => a[1].priority - b[1].priority)
          );
          setData(Object.values(sortedData));
          setKeys(Object.keys(sortedData));
        } else {
          setData(null);
          setKeys(null);
          setAlert({
            type: "danger",
            title: "No data present in database!",
            content: "",
          });
        }
        setIsLoading(false);
      });
  };

  const deleteAllCards = () => {
    setShowModal(false);

    data.map((data, i) => {
      let fileName = data.fileName;
      let Key = keys[i];

      firebase
        .storage()
        .ref("/execom/" + fileName)
        .delete()
        .then(() => {
          firebase
            .database()
            .ref("/execom/" + Key)
            .remove()
            .then(() => {
              fetchData();
            })
            .catch((err) => console.error(err));
        })
        .catch(() =>
          setAlert({
            type: "danger",
            title: "Error!",
            content: "Sorry, you don't have access",
          })
        );

      return null;
    });
  };

  return (
    <>
      {showModal ? (
        <DeleteModal
          message="Are you sure you want to delete all members?"
          deleteCard={deleteAllCards}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}
      <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-20">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">
          Executive Committee{" "}
          {!editYear ? (
            <>
              <span className="mr-5">{year}</span>
              <span className="relative">
                <button
                  title="Edit Year"
                  className="text-sm absolute -top-1 bg-white focus:outline-none text-green-600 rounded-lg p-1 sm:p-2 opacity-100 border border-gray-300"
                  onClick={() => setEditYear(true)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </span>
            </>
          ) : (
            <ExecomYearForm
              year={year}
              Key={yearKey}
              fetchYear={fetchYear}
              setEditYear={setEditYear}
              setAlert={setAlert}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap pt-24 sm:pt-16 z-0">
        <Alert
          type={alert.type}
          title={alert.title}
          content={alert.content}
          setAlert={setAlert}
        />
        <div className="w-full p-6 pb-0">
          {!addNew ? (
            <>
              <button
                className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 mt-5 rounded focus:outline-none"
                onClick={() => setAddNew(true)}
              >
                <i className="fas fa-plus"></i> Add Member
              </button>
              {data ? (
                keys ? (
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-5 rounded focus:outline-none ml-1"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="fas fa-trash-alt"></i> Delete All
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="p-4 mx-auto" style={{ maxWidth: "35rem" }}>
              <ExecomForm
                setAddNew={setAddNew}
                setAlert={setAlert}
                fetchData={fetchData}
              />
            </div>
          )}
        </div>
        {isLoading ? <Loader /> : ""}

        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {data
            ? keys
              ? data.map((data, i) => (
                  <div key={i}>
                    <ExecomCard
                      Key={keys[i]}
                      name={data.name}
                      position={data.position}
                      priority={data.priority}
                      imageUrl={data.imageUrl}
                      fileName={data.fileName}
                      fetchData={fetchData}
                      setAlert={setAlert}
                    />
                  </div>
                ))
              : ""
            : ""}
        </div>
      </div>
    </>
  );
}

export default Execom;

import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import ContactCard from "../../components/Cards/ContactCard";
import ContactForm from "../../components/Forms/ContactForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";
import DeleteModal from "../../components/Modals/DeleteModal";

function Contact() {
  const [data, setData] = useState(null);
  const [keys, setKeys] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    firebase
      .database()
      .ref("/contact/")
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val();
        if (data) {
          setData(Object.values(data));
          setKeys(Object.keys(data));
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
      let Key = keys[i];

      firebase
        .database()
        .ref("/contact/" + Key)
        .remove()
        .then(() => {
          fetchData();
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
          message="Are you sure you want to delete all contacts?"
          deleteCard={deleteAllCards}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}

      <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-20">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Contact us</div>
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
                <i className="fas fa-plus"></i> Add Contact
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
            ""
          )}
        </div>
        {isLoading ? <Loader /> : ""}

        <div className="w-full px-5 py-2">
          <div className="py-2 sm:px-6 lg:px-8">
            <div className="sm:shadow rounded-lg overflow-hidden">
              {data ? (
                <div className="hidden sm:grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                  <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 border-r border-gray-200 uppercase">
                    Name
                  </div>
                  <div className="px-6 py-3 col-span-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone no / email
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* data */}
              {data
                ? keys
                  ? data.map((data, i) => (
                      <div key={i}>
                        <ContactCard
                          Key={keys[i]}
                          name={data.name}
                          phno={data.phno}
                          fetchData={fetchData}
                          setAlert={setAlert}
                        />
                      </div>
                    ))
                  : ""
                : ""}

              {/* form */}
              {addNew ? (
                <div>
                  <ContactForm
                    setAddNew={setAddNew}
                    setAlert={setAlert}
                    fetchData={fetchData}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;

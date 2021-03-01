import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import ContactCard from "../../components/Cards/ContactCard";
import MessagesCard from "../../components/Cards/MessagesCard";
import ContactForm from "../../components/Forms/ContactForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";
import DeleteModal from "../../components/Modals/DeleteModal";

function Contact() {
  const [data, setData] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [keys, setKeys] = useState(null);
  const [messageKeys, setMessageKeys] = useState("null");
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    fetchData();
    fetchMessageData();
  }, []);

  const fetchData = () => {
    setIsLoading1(true);
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
        setIsLoading1(false);
      });
  };

  const fetchMessageData = () => {
    setIsLoading2(true);
    firebase
      .database()
      .ref("/messages/")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        if (data) {
          setMessageData(Object.values(data));
          setMessageKeys(Object.keys(data));
        } else {
          setMessageData(null);
          setMessageKeys(null);
        }
        setIsLoading2(false);
      });
  };

  const deleteAllCards = () => {
    setShowModal1(false);

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

  const deleteAllFormCards = () => {
    setShowModal2(false);

    messageData.map((data, i) => {
      let Key = messageKeys[i];

      firebase
        .database()
        .ref("/messages/" + Key)
        .remove()
        .then(() => {
          fetchMessageData();
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
      {showModal1 ? (
        <DeleteModal
          message="Are you sure you want to delete all contacts?"
          deleteCard={deleteAllCards}
          setShowModal={setShowModal1}
        />
      ) : (
        ""
      )}
      {showModal2 ? (
        <DeleteModal
          message="Are you sure you want to delete all messages?"
          deleteCard={deleteAllFormCards}
          setShowModal={setShowModal2}
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
          <h2 className="text-lg font-medium">Contact Info</h2>
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
                    onClick={() => setShowModal1(true)}
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
        {isLoading1 ? <Loader /> : ""}

        <div className="w-full px-5 py-2 pb-6">
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

        <hr className="bg-gray-100 h-0.5 mx-7 w-full" />

        <div className="w-full p-6 pb-0">
          <h2 className="text-lg font-medium">Messages</h2>
          {messageData ? (
            messageKeys ? (
              <button
                className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-5 rounded focus:outline-none"
                onClick={() => setShowModal2(true)}
              >
                <i className="fas fa-trash-alt"></i> Delete All
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>

        {isLoading2 ? <Loader /> : ""}

        <div className="p-10 pt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {!messageData ? !messageKeys ? <h2>No new messages...</h2> : "" : ""}

          {messageData
            ? messageKeys
              ? messageData.map((data, i) => (
                  <div key={i}>
                    <MessagesCard
                      Key={messageKeys[i]}
                      name={data.name}
                      email={data.email}
                      message={data.message}
                      fetchData={fetchMessageData}
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

export default Contact;

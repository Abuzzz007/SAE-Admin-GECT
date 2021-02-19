import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import RegistrationCard from "../../components/Cards/RegistrationCard";
import RegistrationForm from "../../components/Forms/RegistrationForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";

function Registration() {
  const [data, setData] = useState(null);
  const [keys, setKeys] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    firebase
      .database()
      .ref("/reg/")
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

  return (
    <>
      <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-20">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Registration</div>
      </div>
      <div className="flex flex-wrap pt-24 sm:pt-16 z-0">
        <Alert
          type={alert.type}
          title={alert.title}
          content={alert.content}
          setAlert={setAlert}
        />
        <div className="w-full p-6 pb-0">
          {!isLoading ? (
            !data ? (
              !addNew ? (
                <button
                  className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 mt-5 rounded focus:outline-none"
                  onClick={() => setAddNew(true)}
                >
                  <i className="fas fa-plus"></i> Add Link
                </button>
              ) : (
                <div className="p-4" style={{ maxWidth: "40rem" }}>
                  <RegistrationForm
                    setAddNew={setAddNew}
                    setAlert={setAlert}
                    fetchData={fetchData}
                  />
                </div>
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {isLoading ? <Loader /> : ""}

        <div className="w-full">
          <div className="p-10">
            {data
              ? keys
                ? data.map((data, i) => (
                    <div key={i}>
                      <RegistrationCard
                        Key={keys[i]}
                        link={data.link}
                        fetchData={fetchData}
                        setAlert={setAlert}
                      />
                    </div>
                  ))
                : ""
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;

import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
//Components
import GalleryCard from "../../components/Cards/GalleryCard";
import GalleryForm from "../../components/Forms/GalleryForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";

function Gallery() {
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
      .ref("/gallery/")
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
      <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-10">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Gallery</div>
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
            <button
              className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 mt-5 rounded focus:outline-none"
              onClick={() => setAddNew(true)}
            >
              <i className="fas fa-plus"></i> Add Images
            </button>
          ) : (
            <GalleryForm
              setAddNew={setAddNew}
              setAlert={setAlert}
              fetchData={fetchData}
            />
          )}
        </div>
        {isLoading ? <Loader /> : ""}
        {data
          ? keys
            ? data.map((data, i) => (
                <div className="mx-auto px-4 pt-8 max-w-md mt-5" key={i}>
                  <GalleryCard
                    Key={keys[i]}
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
    </>
  );
}

export default Gallery;

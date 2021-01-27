import { useState } from "react";
//Components
import GalleryCard from "../../components/Cards/GalleryCard";
import GalleryForm from "../../components/Forms/GalleryForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";

function Gallery() {
  // const [state, setState] = useState({ addNew: false });
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState("");
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="left-14 md:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-10">
        <div className="p-4 text-2xl">Gallery</div>
      </div>
      <div className="flex flex-wrap pt-16 z-0">
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
            <GalleryForm setAddNew={setAddNew} setAlert={setAlert} />
          )}
        </div>
        {isLoading ? <Loader /> : ""}
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
      </div>
    </>
  );
}

export default Gallery;

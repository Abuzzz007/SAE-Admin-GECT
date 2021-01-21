import { useState } from "react";
//Components
import GalleryCard from "../../components/Cards/GalleryCard";
import GalleryForm from "../../components/Forms/GalleryForm";

function Gallery() {
  // const [state, setState] = useState({ addNew: false });
  const [addNew, setAddNew] = useState(false);

  return (
    <>
      <div className="w-full bg-gray-100 rounded-b-lg shadow fixed z-2">
        <div className="p-4 text-2xl">Gallery</div>
      </div>
      <div className="flex flex-wrap pt-16 z-0">
        <div className="w-full p-6 pb-0">
          {!addNew ? (
            <button
              className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none"
              onClick={() => setAddNew(true)}
            >
              <i className="fas fa-plus"></i> Add Images
            </button>
          ) : (
            <GalleryForm setAddNew={setAddNew} />
          )}
        </div>
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
        <GalleryCard />
      </div>
    </>
  );
}

export default Gallery;

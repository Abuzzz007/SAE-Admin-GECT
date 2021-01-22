function GalleryCard() {
  const deleteImage = () => {
    console.log("deleted image");
  };

  return (
    <div className="mx-auto px-4 pt-8 max-w-md 2xl:max-w-lg mt-5">
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide relative">
        <button
          className="absolute text-sm bg-gray-800 hover:bg-gray-500 focus:outline-none text-white rounded-lg p-2 opacity-70 right-1 top-1"
          onClick={() => deleteImage()}
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
        <div className="md:flex-shrink-0">
          <img
            src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
            alt="mountains"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;

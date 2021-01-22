function NewsCard() {
  const deleteNews = () => {
    console.log("deleted news");
  };

  return (
    <div className="mx-auto px-4 pt-8 max-w-md 2xl:max-w-lg mt-5">
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide relative">
        <button
          className="absolute text-sm bg-gray-800 hover:bg-gray-500 focus:outline-none text-white rounded-lg p-2 opacity-70 right-1 top-1"
          onClick={() => deleteNews()}
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
        <div className="md:flex-shrink-0">
          <img
            src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
            alt="mountains"
            className="w-full rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <h2 className="font-bold text-2xl text-gray-800 text-center tracking-normal">
            Title Lorem ipsum dolor sit amet
          </h2>
          <div className="text-sm tracking-tighter">
            <h2 className="text-gray-600 text-right mr-4">21 Jan 2020</h2>
          </div>
          <p className="text-md text-gray-900 px-2 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            reiciendis ad architecto at aut placeat quia, minus dolor
            praesentium officia maxime deserunt porro amet ab debitis deleniti
            modi soluta similique...
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;

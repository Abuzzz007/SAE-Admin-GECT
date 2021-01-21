import { useState } from "react";

function GalleryForm(props) {
  const [state, setState] = useState({
    image: "",
  });

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    setState({ ...state, image: URL.createObjectURL(e.dataTransfer.files[0]) });
  };

  const formHandler = (e) => {
    setState({ ...state, image: URL.createObjectURL(e.target.files[0]) });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Submited");
    props.setAddNew(false);
  };

  const formCancel = (e) => {
    e.preventDefault();
    console.log("Cancelled");
    props.setAddNew(false);
  };

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Add Image
                {state.image ? (
                  <span className="font-thin italic text-gray-500 pl-2">
                    Added!!
                  </span>
                ) : (
                  ""
                )}
              </label>
              <div
                className="mt-2 flex justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDragOver={dragOver}
                onDrop={drop}
              >
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-gray-800 hover:text-gray-600 focus:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        onChange={formHandler}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              className="inline-flex justify-center py-2 px-4 mr-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              onClick={(e) => formCancel(e)}
            >
              Cancel
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={(e) => formSubmit(e)}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default GalleryForm;

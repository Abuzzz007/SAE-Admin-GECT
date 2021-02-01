import { useEffect } from "react";

function Modal(props) {
  useEffect(() => {
    document.body.style.paddingRight =
      (window.innerWidth - document.body.clientWidth).toString() + "px";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style = "";
    };
  }, []);

  return (
    <div className="fixed z-40 inset-0">
      <div
        className="absolute inset-0 bg-black opacity-75"
        onClick={() => props.setShowModal(false)}
      ></div>
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <div className="p-5 pb-0 bg-white rounded-lg text-left overflow-hidden shadow-xl">
          <div className="text-center sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-red-500">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Delete
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{props.message}</p>
            </div>
          </div>
          <div className="py-5 text-center">
            <button
              className="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-2 sm:mr-1 sm:w-auto sm:text-sm"
              onClick={() => props.deleteCard()}
            >
              Delete
            </button>
            <button
              className="mt-3 w-full justify-center rounded-md border shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-1 sm:mr-2 sm:w-auto sm:text-sm"
              onClick={() => props.setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

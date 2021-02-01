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
              Network error
            </h3>
            <div className="mt-2 mb-4">
              <p className="text-sm text-gray-500">
                Reconnect to the internet and try again
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

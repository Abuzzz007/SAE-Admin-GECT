function DangerAlert(props) {
  return (
    <div className="fixed z-10 left-14 md:left-64 -right-1">
      <div className="mt-2 -mb-12 w-full pl-6 sm:pl-60 xl:pl-96 overflow-hidden">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full animate-slideLeft">
          <i className="fas fa-times-circle animate-ping mr-3"></i>
          <strong className="font-bold">{props.title}</strong>
          <span>{" " + props.content}</span>
        </div>
      </div>
    </div>
  );
}

export default DangerAlert;

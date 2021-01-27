function FormLoader() {
  return (
    <div className="absolute inset-0 bg-white opacity-75 z-20">
      <div className="absolute left-1/2 top-1/2">
        <div style={{ transform: "translate(-50%,-50%)" }}>
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLoader;

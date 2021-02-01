//css
import "./ContentLoader.css";

function ContentLoader() {
  return (
    <div className="px-4 pt-8  mt-5 w-full">
      <div className="mb-6 relative">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2">
            <div style={{ transform: "translate(-50%,-50%)" }}>
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentLoader;

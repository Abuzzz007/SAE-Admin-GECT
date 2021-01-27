//css
import "./ContentLoader.css";

function ContentLoader() {
  return (
    <div className="mx-auto px-4 pt-8 max-w-md 2xl:max-w-lg mt-5">
      <div className="shadow-2xl rounded-lg mb-6 tracking-wide relative">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2">
            <div style={{ transform: "translate(-50%,-50%)" }}>
              <div class="lds-ellipsis">
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

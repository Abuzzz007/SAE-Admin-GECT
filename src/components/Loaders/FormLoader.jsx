import "./FormLoader.css";

function FormLoader(props) {
  const radius = 50;
  const stroke = 7;
  let progress = props.uploadPercent;

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="absolute inset-0 bg-white opacity-75 z-0">
      <div className="absolute left-1/2 top-1/2">
        <div style={{ transform: "translate(-50%,-50%)" }}>
          {progress !== 101 ? (
            <svg height={radius * 2} width={radius * 2}>
              <circle
                stroke="rgb(17, 24, 39)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default FormLoader;

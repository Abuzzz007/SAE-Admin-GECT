//Components
import { useEffect } from "react";
import Danger from "./Danger";
import Success from "./Success";

function Alert(props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      props.setAlert("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [props]);
  if (props.type === "danger")
    return <Danger title={props.title} content={props.content} />;
  if (props.type === "success")
    return <Success title={props.title} content={props.content} />;
  else return "";
}

export default Alert;

import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";

function ExecomYearForm(props) {
  const [option, setOption] = useState("");

  useEffect(() => {
    if (props.year) {
      setOption(props.year);
    } else {
      setOption("2020-21");
    }
  }, [props.year]);

  const selectHandler = (e) => {
    e.preventDefault();
    setOption(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!props.year) {
      firebase
        .database()
        .ref("/execom-year/")
        .push(
          {
            year: option,
          },
          (err) => {
            if (!err) {
              props.setAlert({
                type: "success",
                title: "Saved successfully",
                content: "",
              });
              props.fetchYear();
              props.setEditYear(false);
            } else {
              props.setAlert({
                type: "danger",
                title: "Error!",
                content: "Sorry you don't have access",
              });
            }
          }
        );
    } else {
      firebase
        .database()
        .ref("/execom-year/" + props.Key)
        .update(
          {
            year: option,
          },
          (err) => {
            if (!err) {
              props.setAlert({
                type: "success",
                title: "Saved successfully",
                content: "",
              });
              props.fetchYear();
              props.setEditYear(false);
            } else {
              props.setAlert({
                type: "danger",
                title: "Error!",
                content: "Sorry you don't have access",
              });
            }
          }
        );
    }
  };

  return (
    <>
      <select
        className="bg-white rounded-lg border-0 mr-1"
        value={option}
        onChange={selectHandler}
      >
        <option>2019-20</option>
        <option>2020-21</option>
        <option>2021-22</option>
        <option>2022-23</option>
        <option>2023-24</option>
        <option>2024-25</option>
        <option>2025-26</option>
        <option>2026-27</option>
        <option>2027-28</option>
        <option>2028-29</option>
        <option>2029-30</option>
      </select>
      <button
        title="Edit Year"
        className="text-sm bg-white focus:outline-none text-green-600 rounded-lg p-1 sm:p-2 opacity-100 border border-gray-300"
        onClick={submitHandler}
      >
        <i className="fas fa-check"></i>
      </button>
      <button
        title="Cancel"
        className="text-sm bg-white focus:outline-none text-red-600 rounded-lg py-1 px-1.5 sm:py-2 sm:px-2.5 opacity-100 border border-gray-300"
        onClick={() => props.setEditYear(false)}
      >
        <i className="fas fa-times"></i>
      </button>
    </>
  );
}

export default ExecomYearForm;

import React from "react";
import { IoTrashBin } from "react-icons/io5";
import "./Component.css";

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.del(props.id);
        }}
      >
        <IoTrashBin />

      </button>
    </div>
  );
}

export default Note;

import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import "./Component.css";

function Create(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    let inputName = e.target.name;
    let inputData = e.target.value;
    setNote((prev) => {
      return {
        ...prev,
        [inputName]: inputData,
      };
    });
  }
  return (
    <div>
      <form>
        <input
          name="title"
          type="text"
          placeholder="Title "
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          type="text"
          placeholder="Take a note...."
          rows="3"
          value={note.content}
          onChange={handleChange}
        />
        <button
          onClick={() => {
            props.click(event, note);

            setNote({
                title:"",
                content:""
            })
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Create;

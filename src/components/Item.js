import React, { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Item(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const [newGender, setNewGender] = useState(props.gender);

  const editFieldRef = useRef(null);
  const editFieldRef2 = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleChange2(e) {
    setNewGender(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editPerson(props.id, newName, newGender);
    setNewName(newName);
    setNewGender(newGender);
    setEditing(false);
  }

  const editingTemplate = (
    <form className="list-item" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="list-info">
          <h3 htmlFor={props.id}>Name</h3>

          <input
            id={props.id}
            className="list-item-input"
            type="text"
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />

          <h3 htmlFor={props.id}>Gender</h3>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="new-gender"
                value="Male"
                checked={newGender === 'Male'}
                onChange={handleChange2}
                ref={editFieldRef2}
                className="form-check-input"
              />
              Male
            </label>
          </div>

          <div className="form-check">
            <label>
              <input
                type="radio"
                name="new-gender"
                value="Female"
                checked={newGender === 'Female'}
                onChange={handleChange2}
                className="form-check-input"
                ref={editFieldRef2}
              />
              Female
            </label>
          </div>
        </div>
      </div>
      <div className="list-item-actions">
        <button
          type="button"
          className="btn item-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="sr-only">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary item-edit">
          Save
          <span className="sr-only">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="list-item">
      <div className="list-info">
        <h3 htmlFor={props.id}>{props.name}</h3>
        <div className="list-gender" htmlFor={props.id}>
          {props.gender}
        </div>
      </div>
      <div className="list-item-actions">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="sr-only">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deletePerson(props.id)}
        >
          Delete <span className="sr-only">{props.name}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <div>{isEditing ? editingTemplate : viewTemplate}</div>;
}

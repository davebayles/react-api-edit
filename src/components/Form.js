import React, { useState } from 'react';

function Form(props) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addPerson(name, gender);
    setName('');
    setGender('');
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleChangeGender(e) {
    setGender(e.target.value);
  }

  return (
    <div className="list-item list-item-add">
      <form onSubmit={handleSubmit}>
        <div className="list-info">
          <h3>Add a new person</h3>
          <input
            type="text"
            id="new-item-input"
            className="list-item-input"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
          <div className="list-gender">
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="new-item-gender"
                  value="Male"
                  defaultChecked
                  onChange={handleChangeGender}
                  className="form-check-input"
                />
                Male
              </label>
            </div>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="new-item-gender"
                  value="Female"
                  className="form-check-input"
                  onChange={handleChangeGender}
                />
                Female
              </label>
            </div>
          </div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

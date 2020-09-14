import React, { useState, useRef } from 'react';
import Form from './components/Form';
import Filters from './components/Filters';
import Item from './components/Item';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: (person) => person.gender === 'Male' || person.gender === 'Female',
  Male: (person) => person.gender === 'Male',
  Female: (person) => person.gender === 'Female',
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [people, setPeople] = useState(props.people);
  const [filter, setFilter] = useState('All');

  function deletePerson(id) {
    const remainingPeople = people.filter((person) => id !== person.id);
    setPeople(remainingPeople);
  }

  function editPerson(id, newName, newGender) {
    console.log(newGender);
    const editedPersonList = people.map((person) => {
      if (id === person.id) {
        //
        return { ...person, name: newName, gender: newGender };
      }
      return person;
    });
    setPeople(editedPersonList);
  }

  const peopleList = people
    .filter(FILTER_MAP[filter])
    .map((person) => (
      <Item
        key={person.id}
        id={person.id}
        name={person.name}
        email={person.email}
        gender={person.gender}
        status={person.status}
        created_at={person.created_at}
        updated_at={person.updated_at}
        deletePerson={deletePerson}
        editPerson={editPerson}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <Filters
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addPerson(name, gender) {
    const newPerson = { id: 'item-' + nanoid(), name: name, gender: gender };
    setPeople([...people, newPerson]);
  }

  const personNoun = peopleList.length !== 1 ? 'People' : 'Person';
  const personGender = filter !== 'All' ? filter : '';
  const headingText = `Displaying ${peopleList.length} ${personGender} ${personNoun}`;

  const listHeadingRef = useRef(null);

  return (
    <div>
      <h2 className="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <div className="filter-btns">{filterList}</div>
      <div className="list-grid">
        <Form addPerson={addPerson} />
        {peopleList}
      </div>
    </div>
  );
}

export default App;

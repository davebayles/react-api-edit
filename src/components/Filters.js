import React from 'react';

function Filters(props) {
  return (
    <button
      type="button"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="sr-only">Show </span>
      <span>{props.name}</span>
      <span className="sr-only"> people</span>
    </button>
  );
}

export default Filters;

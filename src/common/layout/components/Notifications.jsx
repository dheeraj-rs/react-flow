import React from 'react';

function Notifications() {
  return (
    <div className="notification">
      <a
        className="dropdown-toggle"
        href="/#"
        role="button"
        id="dropdownMenuLink"
        // data-bs-toggle="dropdown"
        // aria-expanded="false"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <img src="/assets/bell.svg" alt="" />
        <i className="count">2</i>
      </a>
    </div>
  );
}

export default Notifications;

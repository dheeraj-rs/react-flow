import React from 'react';

function OffcanvasMobile() {
  return (
    <a
      className="hamberger"
      data-bs-toggle="offcanvas"
      href="#offcanvasMobile"
      role="button"
      aria-controls="offcanvasMobile"
      // onClick={(e) => { e.preventDefault() }}
    >
      <svg
        width="36"
        height="32"
        viewBox="0 0 36 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="7" y1="7" x2="29" y2="7" stroke="#555555" strokeWidth="2" strokeLinecap="round" />
        <line
          x1="7"
          y1="23"
          x2="29"
          y2="23"
          stroke="#555555"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="15"
          x2="22"
          y2="15"
          stroke="#555555"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}

export default OffcanvasMobile;

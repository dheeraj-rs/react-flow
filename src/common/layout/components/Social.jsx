import React from 'react';

function Social() {
  return (
    <div>
      <a
        href="/#"
        role="button"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <img src="/assets/social.svg" alt="" />
      </a>
    </div>
  );
}

export default Social;

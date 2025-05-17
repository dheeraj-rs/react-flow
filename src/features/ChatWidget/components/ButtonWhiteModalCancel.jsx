/* eslint-disable import/no-named-as-default, import/no-named-as-default-member */
import React from 'react';

function ButtonWhiteModalCancel({ text, onCancel }) {
  return (
    <button
      id="modal-close"
      type="button"
      className="custom-backdrop-close d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-2 btn-cancel-common"
      onClick={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      {text}
    </button>
  );
}

export default ButtonWhiteModalCancel;

/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
// import { handleKeyPressForNumber } from '../../../../common/helpers/utils';

function InputList({
  index,
  value,
  onChange,
  // formik,
  hasError = false,
  hasDuplicateError = false,
}) {
  return (
    <div>
      <div
        className="px-3 py-2 rounded"
        style={{ boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.41)' }}
      >
        <div className="d-flex align-items-center justify-content-between gab-3">
          <div className="d-flex align-items-center gap-2">
            <span className="d-flex align-items-center justify-content-center h-4 w-4 rounded bg-seaShell">
              {index + 1}
            </span>
            <span>Input</span>
          </div>
          <div>
            <input
              type="text"
              placeholder=""
              value={value}
              className="form-control bg-white"
              onChange={onChange}
              // onKeyPress={handleKeyPressForNumber}
              // style={{ maxWidth: '100px' }}
              style={{
                maxWidth: '100px',
                border: hasError || hasDuplicateError ? '1px solid red' : '1px solid #dee2e6',
              }}
            />
          </div>
          <div style={{ width: '70px' }} />
        </div>
      </div>
    </div>
  );
}

export default InputList;

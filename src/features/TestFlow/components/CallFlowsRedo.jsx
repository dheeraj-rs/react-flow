import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsRedo({ setToDefaultLayout, isEnabled }) {
  return (
    <div
      className="mb-3 d-flex justify-content-center"
      onClick={isEnabled ? setToDefaultLayout : undefined}
      data-tooltip-id="tooltip-redo"
      style={{
        cursor: isEnabled ? 'pointer' : 'not-allowed',
        opacity: isEnabled ? 1 : 0.5,
        userSelect: 'none',
      }}
    >
      <span
        className="reload"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        style={{
          width: '40px',
          height: '40px',
          cursor: isEnabled ? 'pointer' : 'not-allowed',
          userSelect: 'none',
        }}
      >
        <img src="/assets/call-flows-icons/redo.svg" alt="" />
      </span>
      {isEnabled && <Tooltip id="tooltip-redo" content="Redo" place="right" />}
    </div>
  );
}

export default CallFlowsRedo;

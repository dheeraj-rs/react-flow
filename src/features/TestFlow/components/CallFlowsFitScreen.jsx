import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsFitScreen({ setToDefaultLayout }) {
  return (
    <div
      className="mb-3 d-flex justify-content-center"
      onClick={setToDefaultLayout}
      data-tooltip-id="tooltip-fitscreen"
    >
      <span
        className="reload"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        style={{
          width: '40px',
          height: '40px',
        }}
      >
        <img src="/assets/call-flows-icons/fitscreen.svg" alt="" />
      </span>
      <Tooltip id="tooltip-fitscreen" content="Fit screen" place="right" />
    </div>
  );
}

export default CallFlowsFitScreen;

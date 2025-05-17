import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsAutoArrange({ setToDefaultLayout }) {
  return (
    <div
      className="mb-3 d-flex justify-content-center"
      onClick={setToDefaultLayout}
      data-tooltip-id="tooltip-autoarrange"
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
        <img src="/assets/call-flows-icons/autoarrange.svg" alt="" />
      </span>
      <Tooltip id="tooltip-autoarrange" content="Auto Arrange" place="right" />
    </div>
  );
}

export default CallFlowsAutoArrange;

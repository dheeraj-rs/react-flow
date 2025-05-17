import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsZoomIn({ setToDefaultLayout }) {
  return (
    <div
      className="mb-3 d-flex justify-content-center"
      onClick={setToDefaultLayout}
      data-tooltip-id="tooltip-zoomin"
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
        <img src="/assets/call-flows-icons/zoomin.svg" alt="" />
      </span>
      <Tooltip id="tooltip-zoomin" content="Zoom In" place="right" />
    </div>
  );
}

export default CallFlowsZoomIn;

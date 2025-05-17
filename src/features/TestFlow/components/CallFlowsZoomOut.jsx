import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsZoomOut({ setToDefaultLayout }) {
  return (
    <div
      className="mb-3 d-flex justify-content-center"
      onClick={setToDefaultLayout}
      data-tooltip-id="tooltip-zoomout"
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
        <img src="/assets/call-flows-icons/zoomout.svg" alt="" />
      </span>
      <Tooltip id="tooltip-zoomout" content="Zoom Out" place="right" />
    </div>
  );
}

export default CallFlowsZoomOut;

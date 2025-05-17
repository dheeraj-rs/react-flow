import React from 'react';

function CallPlayingHeader({ handleStart, handleStop, handleReset }) {
  return (
    <div className="shadow-11 rounded p-3 d-flex gap-4 justify-content-between mt-5 mt-sm-3">
      <p
        className="mb-0 d-flex gap-2 align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={handleStart}
      >
        <img src="/assets/start-button.svg" alt="" /> Start
      </p>
      <p
        className="mb-0 d-flex gap-2 align-items-center opacity-75"
        style={{ cursor: 'pointer' }}
        onClick={handleStop}
      >
        <img src="/assets/stop-button.svg" alt="" /> Stop
      </p>
      <p
        className="mb-0 d-flex gap-2 align-items-center opacity-75"
        style={{ cursor: 'pointer' }}
        onClick={handleReset}
      >
        <img src="/assets/reastat-button.svg" alt="" /> Restart
      </p>
    </div>
  );
}

export default CallPlayingHeader;

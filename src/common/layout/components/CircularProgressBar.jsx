import React from 'react';

function CircularProgressBar({ value, dataPercentage }) {
  return (
    <div className="gap-2  progress-card progress-head pe-4">
      <div className="progress-green" data-percentage={dataPercentage}>
        <span className="progress-left-green">
          <span className="progress-bar-green" />
        </span>
        <span className="progress-right-green">
          <span className="progress-bar-green" />
        </span>
        <div className="progress-value-green">
          <div className="fw-bolder text-green-haze">{value}</div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <span className="fw-medium fs-12px"> Days trial left</span>
        <a
          className="me-3 me-md-0 fs-12px"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {' '}
          Upgrade
        </a>{' '}
      </div>
    </div>
  );
}

export default CircularProgressBar;

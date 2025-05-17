import React from 'react';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import '../../../styles/scss/components/sideNavCuston.scss';
import { copyToClipboard } from '../../helpers/utils';

function SidebarAccountItem({ index, domain, imgOne, imgTwo, labelOne, labelTwo }) {
  const AccountList = {
    fontWeight: '500',
    color: '#333',
  };

  const AccountItemImage = {
    width: '23px',
  };

  const AccountItemLabel = {
    color: '#333',
  };

  return (
    <div className="sideNav-account-item mb-5">
      <h5 className="fs-14px text-primary d-flex gap-2 align-items-center mb-2">
        <span>
          <span className="bullet" />
        </span>
        <span style={AccountList}>{domain}</span>
        <a
          href="/#"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="info"
          data-tooltip-id={`info-${index}`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img src="/customNav/Info.svg" alt="" />
          <Tooltip id={`info-${index}`} content="info" place="top" />
        </a>
        <div className="position-relative">
          <a
            className="copy-switcher copy-button"
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard(domain);
            }}
          >
            <img src="/customNav/CopySimple.svg" alt="" />
          </a>
        </div>
      </h5>
      <div className="d-flex align-items-center gap-4 ps-4">
        <div className="d-flex align-items-center gap-2 cursor-pointer">
          <div>
            <img style={AccountItemImage} src={imgOne} alt="" />
          </div>
          <p style={AccountItemLabel} className="fs-13px text-secondary m-0">
            {labelOne}
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 cursor-pointer">
          <div>
            <img style={AccountItemImage} src={imgTwo} alt="" />
          </div>
          <p style={AccountItemLabel} className="fs-13px text-secondary m-0">
            {labelTwo}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SidebarAccountItem;

import React from 'react';
import normalize from 'json-api-normalizer';
import '../../../styles/scss/components/sideNavCuston.scss';
import SidebarAccountItem from './SidebarAccountItem';
import {
  clearLocalStorage,
  getDataFromLS,
  isSuperAdminFunction,
  isTenantAdminFunction,
} from '../../helpers/utils';

function SideNavCustom({ userDetails, organizationDetails, accountsList = [] }) {
  const isTenantAdmin = isTenantAdminFunction();
  const isSuperAdmin = isSuperAdminFunction();

  const getDomain = (id) => {
    if (normalize(accountsList?.data)?.domain[id]?.attributes?.url) {
      return normalize(accountsList?.data)?.domain[id]?.attributes?.url?.replace(
        /^https?:\/\//,
        ''
      );
    }
    return '';
  };

  return (
    <div className="custom-sidebar p-2 rounded" id="offcanvasSwitcher" style={{ zIndex: '9999' }}>
      {/* #####################sidebar top section ###################### */}
      <div className="bg-white sidebar-top-section rounded-top">
        <div className="d-flex gap-3 p-4">
          <div>
            <span className="sidebar-profile-image-wrap sidebar-profile-img">
              <img
                alt=""
                src={
                  userDetails?.data?.data?.attributes?.profile_photo_url ||
                  '../../../../public/assets/avathar-header.svg'
                }
              />
            </span>
          </div>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="fs-16px fw-bold text-primary text-capitalize m-0">
                  {userDetails?.data?.data?.attributes?.first_name}{' '}
                  {userDetails?.data?.data?.attributes?.last_name}
                </h4>
                <p className="text-black fs-13px fw-normal mb-0 mt-1">
                  {userDetails?.data?.data?.attributes?.email}
                </p>
              </div>
              <div>
                <img alt="" src="/assets/vertical-dot-img.svg" />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-2">
              {isTenantAdmin && (
                <p className="m-0 color-orange text-capitalize fs-12px">Organization Admin</p>
              )}
              <p className="m-0 color-orange text-capitalize fs-12px" />
              <ul className="d-flex align-items-center">
                <li className="ps-2">
                  <a
                    href="/#"
                    className="fs-13px"
                    onClick={async (e) => {
                      e.preventDefault();
                      await clearLocalStorage().then(() => {
                        const isRememberMeEnabled = getDataFromLS('isRememberMeEnabled');
                        if (isRememberMeEnabled === false) {
                          localStorage.removeItem('logedUserDetails');
                        } else {
                          window.location.reload();
                        }
                      });
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-side-gray">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img alt="" src="/assets/building.svg" />
              </div>
              <div>
                <h4 className="fs-13px fw-500 color-black m-0">
                  {organizationDetails?.data?.data?.attributes?.name}
                </h4>
                <p className="fs-13px text-text-gray m-0">
                  {window.location.hostname.replace(/^app\./, '')}
                </p>
              </div>
            </div>
            <div>
              <img alt="" src="/assets/Gear.svg" />
            </div>
          </div>
        </div>
      </div>
      {/* #####################sidebar top section ends ################# */}
      {/* ##################### sidebar bottom  section ################# */}
      <div
        className={`sidebar-bottom-section bg-white rounded-bottom ${isSuperAdmin ? 'd-none' : ''}`}
        style={{ height: '45%' }}
      >
        <div className="sidebar-accounts-outer p-4 scroll-custom" style={{ height: '100%' }}>
          <h4 className="fs-14px text-primary m-0 fw-bold mb-4">Accounts</h4>
          {accountsList?.data?.data?.length > 0 &&
            accountsList?.data?.data?.map((module, index) => (
              <SidebarAccountItem
                key={index}
                index={index}
                domain={getDomain(module?.relationships?.domain?.data?.id)}
                imgOne="/customNav/Group_1707478526.svg"
                imgTwo="/customNav/logo.svg"
                labelOne="CommChat"
                labelTwo="CommVoice"
                xxx=""
              />
            ))}
        </div>
        <div className="sidebar-products p-4 rounded-bottom">
          <div className="d-flex align-item-center justify-content-between">
            <h4 className="fs-14px text-primary m-0 fw-bold mb-2">Experience other products</h4>
            <div className="d-flex align-item-center gap-2 cursor-pointer">
              <span>
                <img alt="" src="/customNav/Swap.svg" />
              </span>
              <span className="migrate fw-500">Migrate</span>
            </div>
          </div>
          <div className="row align-items-center mt-1 ">
            <div
              className="col-lg-3 col-sm-3 col-6 chat-img rounded"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="">
                <a
                  href="/#"
                  className="text-primary text-hover"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="d-flex flex-column gap-2 align-items-center justify-content-center p-2 rounded">
                    <img alt="" width="30" src="/assets/comm-voice-logo.svg" />
                    <span className="text-center fs-12px apps-item">
                      Comm <br /> Voice
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-6 chat-img rounded">
              <div className="">
                <a
                  href="/#"
                  className="text-primary text-hover"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2 p-2 rounded">
                    <img alt="" width="30" src="/assets/comm-desk.svg" />
                    <span className="text-center fs-12px apps-item">
                      Comm <br /> Desk
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3 col-6 chat-img rounded">
              <div className="">
                <a
                  href="/#"
                  className="text-primary text-hover"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2 p-2 rounded">
                    <img alt="" width="30" src="/assets/Campaign-comm.svg" />
                    <span className="text-center fs-12px apps-item">
                      Comm <br /> Campaign
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavCustom;

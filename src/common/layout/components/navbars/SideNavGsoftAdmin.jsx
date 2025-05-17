import React, { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { Tooltip } from 'react-tooltip';
import normalize from 'json-api-normalizer';
import '../../../../styles/scss/components/sidenav-admin.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  getDataFromLS,
  isSuperAdminFunction,
  isTenantAdminFunction,
  isTenantUserFunction,
  removeDataFromLocalStorage,
} from '../../../helpers/utils';
import menu from './menu';

function SideNavAdmin({
  isMobile,
  userDetails,
  organizationDetails,
  accountsList = [],
  active = '',
  sideNavIcon = '',
}) {
  const isTenantUSer = isTenantUserFunction();
  const isTenantAdmin = isTenantAdminFunction();
  const isSuperAdmin = isSuperAdminFunction();

  const [userType, setUserType] = useState('');

  const navigate = useNavigate();

  const [copiedData, setCopiedData] = useState({});

  const copyToClipboard = (data) => {
    setCopiedData(data);
    copy(data.text);
  };

  function clearLocalStorage() {
    return new Promise((resolve, reject) => {
      const status = removeDataFromLocalStorage('authData');
      if (status) {
        resolve();
      } else {
        // If failed, reject with a reason
        reject(new Error('Operation failed!'));
      }
    });
  }

  const getAccountUrl = (domainId) => {
    if (domainId) {
      return normalize(accountsList?.data)?.domain[domainId]?.attributes;
    }
    return '';
  };

  const getUSerType = () => {
    if (isSuperAdmin) {
      setUserType('super-admin');
    } else if (isTenantAdmin) {
      setUserType('tenant-admin');
    } else if (isTenantUSer) {
      setUserType('tenant-user');
    }
    return null;
  };

  useEffect(() => {
    getUSerType();
  }, []);

  if (isMobile === false) {
    return (
      <>
        <aside className="left-nav w-lg-nav w-md-nav-md vh-100 position-fixed d-flex flex-column align-items-center flex-shrink-0 bg-dark-blue  d-none d-lg-block">
          <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li className="nav-item mb-4 mt-3" id="mainLogo">
              <Link
                to="/landing-page"
                className="nav-link bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none overly-back"
                aria-current="page"
              >
                <img src={sideNavIcon} alt="" />
              </Link>
            </li>

            {menu?.map((item, index) => {
              if (item?.type === 'supply-chain' && item?.visibility?.includes(userType)) {
                return (
                  <li className="nav-item mb-4 agent-sidebar position-relative" key={index}>
                    <div aria-expanded="false">
                      <span className="agent-wrap nav-link nav-link-side bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none cursor-pointer">
                        <img src="/assets/sidenav/supply-chain.svg" alt="" />
                      </span>
                    </div>
                    <ul className="custom_dropdown_menu py-3 cursor-pointer shadow-2">
                      <li>
                        <Link
                          to="/chat-widget"
                          className="d-flex align-items-center gap-2 px-3 py-2 bg-titan-water-hover"
                        >
                          <span>
                            <img src="/assets/sidenav/comm-chat.svg" alt="" />
                          </span>
                          <span className="fs-12px text-primary">Comm Chat</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/comm-voice-admin"
                          className="d-flex align-items-center gap-2 px-3 py-2 bg-titan-water-hover"
                        >
                          <span>
                            <img src="/assets/sidenav/comm-voice.svg" alt="" />
                          </span>
                          <span className="fs-12px text-primary">Comm Voice</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/comm-voice-admin"
                          className="d-flex align-items-center gap-2 px-3 py-2 bg-titan-water-hover"
                        >
                          <span>
                            <img src="/assets/sidenav/comm-desk.svg" alt="" />
                          </span>
                          <span className="fs-12px text-primary">Comm Desk</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className={`nav-item mb-4 ${
                    item?.visibility?.includes(userType) ? '' : 'd-none'
                  }`}
                >
                  <Link
                    // id="switcher"
                    to={item?.link}
                    className={`${
                      (
                        active === ''
                          ? item?.activeUrls?.includes(window.location.pathname.replace(/\/$/, ''))
                          : item?.activeUrls?.includes(active)
                      )
                        ? 'active'
                        : ''
                    } nav-link nav-link-side bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none`}
                    data-tooltip-id={item?.tooltipId}
                  >
                    <img src={item?.img} alt="" />
                    <Tooltip id={item?.tooltipId} content={item?.tooltipContent} place="right" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="offcanvas offcanvas-start offcanvas-switcher ms-0 border-0 shadow-7">
          <div className="offcanvas-body p-0">
            <button
              type="button"
              className="p-3 btn-close float-end d-block d-lg-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />

            <div className="bg-white-3 h-100 drop-show">
              <div className="d-flex gap-3 p-4">
                <div className="dropdown-profile-img">
                  <img
                    src={
                      userDetails?.data?.data?.attributes?.profile_photo_url ||
                      '/svg/icons/user-gradient.svg'
                    }
                    alt=""
                    width="40px"
                    height="40px"
                  />
                </div>
                <div className="d-flex flex-column gap-0">
                  <div className="fs-14px fw-bold text-primary d-flex gap-3">
                    {userDetails?.data?.data?.attributes?.first_name}{' '}
                    {userDetails?.data?.data?.attributes?.last_name}
                  </div>
                  <div className="fw-normal text-primary">
                    {' '}
                    {userDetails?.data?.data?.attributes?.email}
                  </div>
                  <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 gap-md-4 mt-2">
                    <div className="rounded-3 fw-semibold text-uppercase py-2 px-2 fs-11 d-flex align-items-center justify-content-center bg-orange-back text-dark">
                      ORGANIZATION ADMIN
                    </div>

                    <div>
                      <Link to="/comm-admin-centre/manage-profile" className="mt-2">
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="ms-auto">
                  <div
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-title="Logout"
                    className=" logout h-5 w-5 d-flex rounded-circle align-items-center justify-content-center  bg-white me-1"
                    onClick={async () => {
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-tooltip-id="tooltip-Logout"
                    >
                      <path
                        d="M13.5628 11.4375H12.4644C12.3894 11.4375 12.3191 11.4703 12.2722 11.5281C12.1628 11.661 12.0457 11.7891 11.9222 11.911C11.4174 12.4163 10.8194 12.8191 10.1613 13.0969C9.4795 13.3849 8.7467 13.5326 8.0066 13.5313C7.25816 13.5313 6.53316 13.3844 5.85191 13.0969C5.19383 12.8191 4.59583 12.4163 4.09097 11.911C3.58521 11.4073 3.18194 10.8104 2.90347 10.1531C2.61441 9.4719 2.4691 8.74846 2.4691 8.00002C2.4691 7.25159 2.61597 6.52815 2.90347 5.8469C3.1816 5.18909 3.5816 4.5969 4.09097 4.08909C4.60035 3.58127 5.19253 3.18127 5.85191 2.90315C6.53316 2.61565 7.25816 2.46877 8.0066 2.46877C8.75503 2.46877 9.48003 2.61409 10.1613 2.90315C10.8207 3.18127 11.4128 3.58127 11.9222 4.08909C12.0457 4.21252 12.1613 4.34065 12.2722 4.4719C12.3191 4.52971 12.391 4.56252 12.4644 4.56252H13.5628C13.6613 4.56252 13.7222 4.45315 13.6675 4.37034C12.4691 2.50784 10.3722 1.27502 7.98941 1.28127C4.24566 1.29065 1.2441 4.32971 1.2816 8.06878C1.3191 11.7485 4.31597 14.7188 8.0066 14.7188C10.3832 14.7188 12.4707 13.4875 13.6675 11.6297C13.7207 11.5469 13.6613 11.4375 13.5628 11.4375ZM14.9519 7.90159L12.7347 6.15159C12.6519 6.08596 12.5316 6.14534 12.5316 6.25002V7.43752H7.62535C7.5566 7.43752 7.50035 7.49377 7.50035 7.56252V8.43752C7.50035 8.50627 7.5566 8.56252 7.62535 8.56252H12.5316V9.75002C12.5316 9.85471 12.6535 9.91409 12.7347 9.84846L14.9519 8.09846C14.9668 8.08677 14.9789 8.07183 14.9872 8.05477C14.9956 8.03772 14.9999 8.019 14.9999 8.00002C14.9999 7.98105 14.9956 7.96233 14.9872 7.94527C14.9789 7.92822 14.9668 7.91328 14.9519 7.90159Z"
                        fill="#D21E1E"
                      />
                    </svg>

                    <Tooltip id="tooltip-Logout" content="Logout" place="right" />
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 pt-1 pb-4 px-5 bg-white border-border-gray-white border-bottom">
                <div className="dropdown-profile-img">
                  <img src="/assets/Buildingsimg.svg" alt="" />
                </div>

                <div className="d-flex flex-column gap-1">
                  <div className="text-primary fw-500">
                    {organizationDetails?.data?.data?.attributes?.name}
                  </div>
                  <div className="text-secondary ">
                    {window.location.hostname.replace(/^app\./, '')}
                  </div>
                </div>
                <div className="ms-auto">
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-title="Manage organization"
                    data-tooltip-id="tooltip-Manage-organization"
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/comm-admin-centre/manage-company');
                    }}
                  >
                    <img src="/assets/Gear-img.svg" alt="" />
                  </a>
                  <Tooltip
                    id="tooltip-Manage-organization"
                    content="Manage organization"
                    place="right"
                  />
                </div>
              </div>

              <div />
              <div className="scroll-custom all-accounts">
                {accountsList?.data?.data?.map((account, index) => (
                  <div
                    className="account-box border border-border-gray-white mx-4 mt-4 rounded"
                    key={index}
                    onClick={() => {
                      // navigate(getDomainURL(account?.relationships?.domain?.data?.id)?.url);
                      window.location.href = `${
                        getAccountUrl(account?.relationships?.domain?.data?.id)?.url
                      }/app/landing-page`;
                    }}
                  >
                    <div className="p-4 d-flex align-items-end gap-3 py-3">
                      <div className="d-flex flex-column">
                        <div className="text-secondary font-12">Account</div>

                        <a
                          className="fw-500"
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {getAccountUrl(account?.relationships?.domain?.data?.id)?.subdomain}
                        </a>
                      </div>
                      <div
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="info"
                        aria-label="Team inbox"
                        data-tooltip-id="tooltip-info"
                      >
                        <img className="pointer" src="/assets/Info-sidebar.svg" alt="" />
                        <Tooltip id="tooltip-info" content="info" place="right" />
                      </div>
                      <div className="position-relative">
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            copyToClipboard({
                              id: 1,
                              text: 'abcinternational.comm.com',
                            });
                          }}
                          data-tooltip-id="tooltip-copy-1"
                        >
                          <img className="pointer" src="/assets/copy-sidebar.svg" alt="" />
                          <Tooltip
                            id="tooltip-copy-1"
                            content={copiedData.id === 1 ? 'Copied!' : 'Copy to clipboard'}
                            place="bottom"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="d-flex gap-3 px-4 mb-3 gap-4 align-items-center">
                      <div>
                        <a
                          className="text-primary hover"
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <img src="/assets/pink-chat.svg" alt="" />
                          <span className="ms-3">comm chat</span>
                        </a>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="card-circle-org h-1 w-1 bg-s-green float-end d-block rounded-circle" />
                        <span className="text-s-green ms-2">Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-aqua-haze p-4 mt-4 all-apps">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    {' '}
                    <h5 className="text-primary fw-500 w-100 flex-wrap fs-13px mb-0">
                      Experience other products
                    </h5>
                  </div>

                  <div>
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      All apps
                    </a>
                  </div>
                </div>

                <div className="row align-items-center justify-content-between mt-3 ">
                  <div
                    className="col-lg-3 col-sm-3 col-6 chat-img rounded"
                    onClick={() => {
                      // navigate('/chat-widget');
                    }}
                  >
                    <div className="">
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="text-primary text-hover"
                      >
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center p-2 rounded">
                          <img width="30" src="/assets/comm-chat.svg" alt="" />
                          <span className="text-center">
                            Comm <br /> Chat
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-sm-3 col-6 chat-img rounded"
                    onClick={() => {
                      navigate('/comm-telephony/contact-company-management');
                    }}
                  >
                    <div className="">
                      <a
                        className="text-primary text-hover"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center gap-2 p-2 rounded">
                          <img width="30" src="/assets/comm-voice.svg" alt="" />
                          <span className="text-center">
                            Comm <br /> Voice
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-sm-3 col-6 chat-img rounded"
                    onClick={() => {
                      navigate('/support-widget');
                    }}
                  >
                    <div className="">
                      <a
                        className="text-primary text-hover"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center gap-2 p-2 rounded">
                          <img width="30" src="/assets/comm-support.svg" alt="" />
                          <span className="text-center">
                            Comm <br /> Support
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-3 col-6 chat-img rounded">
                    <div className="">
                      <a
                        className="text-primary text-hover"
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="d-flex  flex-column align-items-center justify-content-center gap-2 p-2 rounded">
                          <img width="30" src="/assets/comm-omni.svg" alt="" />
                          <span className="text-center">
                            Comm <br /> Omnichannel
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4 pb-0">
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span className="pe-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 10H13C13.1326 10 13.2598 9.94732 13.3536 9.85355C13.4473 9.75979 13.5 9.63261 13.5 9.5V3C13.5 2.86739 13.4473 2.74021 13.3536 2.64645C13.2598 2.55268 13.1326 2.5 13 2.5H6C5.86739 2.5 5.74021 2.55268 5.64645 2.64645C5.55268 2.74021 5.5 2.86739 5.5 3V3.5"
                          stroke="#645DF6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M6.5 8.5L5 10L6.5 11.5" fill="#645DF6" />
                        <path
                          d="M6.5 8.5L5 10L6.5 11.5"
                          stroke="#645DF6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 6H3C2.86739 6 2.74021 6.05268 2.64645 6.14645C2.55268 6.24021 2.5 6.36739 2.5 6.5V13C2.5 13.1326 2.55268 13.2598 2.64645 13.3536C2.74021 13.4473 2.86739 13.5 3 13.5H10C10.1326 13.5 10.2598 13.4473 10.3536 13.3536C10.4473 13.2598 10.5 13.1326 10.5 13V12.5"
                          stroke="#645DF6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 7.5L11 6L9.5 4.5"
                          stroke="#645DF6"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Comm Migrate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
}

export default SideNavAdmin;

import React, { useRef, useState } from 'react';
import CircularProgressBar from './CircularProgressBar';
import Notifications from './Notifications';
import Social from './Social';
import UserImage from './UserImage';
import DropDown from './DropDown';
import '../../../styles/scss/components/header-dropdown.scss';

function Header({ title = 'Contacts', isMobile, setShowSearch, showSearch, userDetails }) {
  const inputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState();
  const [isInputActive, setIsInputActive] = useState(false);

  const handleClick = () => {
    setShowSearch(true);
    // setIsInputActive(true);
    // if (inputRef.current) {
    //   inputRef.current.click();
    // }
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
  };

  const handleInputBlur = () => {
    setIsInputActive(false);
    setSearchTerm('');
  };
  return (
    <nav
      id="mainHeader"
      className={`shadow-sm nav-header header ms-lg-65 ms-md-0 navbar navbar-expand-lg bg-white position-fixed py-0 px-lg-3 px-md-0 ${
        showSearch && isMobile ? 'd-none' : ''
      }`}
    >
      <div className="container-fluid">
        <a
          className="hamberger"
          data-bs-toggle="offcanvas"
          href="#offcanvasMobile"
          role="button"
          aria-controls="offcanvasMobile"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <svg
            width="36"
            height="32"
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="7"
              y1="7"
              x2="29"
              y2="7"
              stroke="#555555"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="7"
              y1="23"
              x2="29"
              y2="23"
              stroke="#555555"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="7"
              y1="15"
              x2="22"
              y2="15"
              stroke="#555555"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </a>

        <a
          className="navbar-brand nav-head text-dark-blue fw-bolder fs-sm-14px fs-lg-18px fs-14px"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {title}
        </a>

        <div className="d-flex align-items-center ms-auto gap-3">
          <div className="pe-3" id="headerSearchWrap">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <div className="d-flex align-items-center">
                  <form id="myForm2">
                    <a
                      href="/#"
                      className="d-block d-lg-none"
                      id="headerSearchIcon"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                      }}
                    >
                      <img height="20" width="20" src="/assets/search-form.svg" alt="" />
                    </a>
                    <input
                      ref={inputRef}
                      type="search"
                      // className="global-search-header global-search-new d-none d-lg-block"
                      className={
                        isInputActive
                          ? 'global-search-header global-search-new d-none d-lg-block global-search-header-focus'
                          : 'global-search-header global-search-new d-none d-lg-block'
                      }
                      placeholder="Navigate to.."
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={(e) => {
                        setSearchTerm(e?.target?.value);
                      }}
                      value={searchTerm || ''}
                    />
                  </form>
                </div>

                <div
                  id="search-suggestion"
                  className={
                    isInputActive && searchTerm?.length > 0
                      ? 'search-suggestion d-flex scroll-custom flex-column flex-lg-row bg-white rounded shadow-6 position-absolute top-100'
                      : 'search-suggestion d-flex scroll-custom flex-column flex-lg-row bg-white rounded shadow-6 position-absolute top-100 d-none'
                  }
                >
                  {/* search results starts */}
                  <div>
                    <div id="searchResultOuter" className="min-width-530 p-4 bg-white rounded">
                      <div className="search-result">
                        <h5 className="text-dark fw-normal mb-4 fs-13px">
                          Search results{' '}
                          <span className="d-inline-block text-mango-orange p-1 rounded">
                            ipsum
                          </span>{' '}
                          (10)
                        </h5>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="tab-content">
                              <div className="search-contents">
                                <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4">
                                  <h6 className="mb-0 fw-bolder">Comm Chat</h6>
                                  <a
                                    href="/#"
                                    className="view-setting"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    View all
                                  </a>
                                </div>
                                <div className="d-flex d-flex gap-3 mb-2">
                                  <div>
                                    <img src="/assets/channel-msg.svg" alt="" />
                                  </div>
                                  <div>
                                    <h6>Customize</h6>
                                    <p>
                                      Lorem{' '}
                                      <span className="d-inline-block text-mango-orange p-1 rounded">
                                        ipsum
                                      </span>{' '}
                                      dolor sit amet, consectetur.
                                    </p>
                                  </div>
                                </div>

                                <div className="d-flex d-flex gap-3 mb-2">
                                  <div>
                                    <img src="/assets/channl-search.svg" alt="" />
                                  </div>
                                  <div>
                                    <h6>Channel</h6>
                                    <p>
                                      Lorem{' '}
                                      <span className="d-inline-block text-mango-orange p-1 rounded">
                                        ipsum
                                      </span>{' '}
                                      dolor sit amet, consectetur.
                                    </p>
                                  </div>
                                </div>

                                <div className="d-flex d-flex gap-3 mb-2">
                                  <div>
                                    <img src="/assets/Microphone.svg" alt="" />
                                  </div>
                                  <div>
                                    <h6 className="">Comm Voice tuning</h6>
                                    <p>
                                      Lorem{' '}
                                      <span className="d-inline-block text-mango-orange p-1 rounded">
                                        ipsum
                                      </span>{' '}
                                      dolor sit amet, consectetur.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4">
                                  <h6 className="mb-0 fw-bolder">Comm Voice</h6>
                                  <a
                                    href="/#"
                                    className="view-setting"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    View all
                                  </a>
                                </div>
                                <div className="d-flex d-flex gap-3 mb-2">
                                  <div>
                                    <img src="/assets/account.svg" alt="" />
                                  </div>
                                  <div>
                                    <h6>Forerun Global Solutions</h6>
                                    <p>United States of America</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="back-setting d-none">
                          <div className="d-flex gap-3 mb-4">
                            <div>
                              <a
                                href="/#"
                                className="setting-details"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <img src="/assets/ArrowLeftb.svg" alt="" /> Back
                              </a>
                            </div>
                            <div>
                              Search results <b className="text-mango-orange">ipsum</b> (5)
                            </div>
                          </div>
                          <h6 className="border-bottom mb-3 pb-2">Comm voice</h6>
                          <div className="d-flex d-flex gap-3 mb-2">
                            <div>
                              <img src="/assets/channel-msg.svg" alt="" />
                            </div>
                            <div>
                              <h6>Stored Responses</h6>
                              <p>
                                Lorem{' '}
                                <span className="d-inline-block text-mango-orange p-1 rounded">
                                  ipsum
                                </span>{' '}
                                dolor sit amet, consectetur.
                              </p>
                            </div>
                          </div>

                          <div className="d-flex d-flex gap-3 mb-2">
                            <div>
                              <img src="/assets/channl-search.svg" alt="" />
                            </div>
                            <div>
                              <h6>Channel</h6>
                              <p>
                                Lorem{' '}
                                <span className="d-inline-block text-mango-orange p-1 rounded">
                                  ipsum
                                </span>{' '}
                                dolor sit amet, consectetur.
                              </p>
                            </div>
                          </div>

                          <div className="d-flex d-flex gap-3 mb-2">
                            <div>
                              <img src="/assets/Microphone.svg" alt="" />
                            </div>
                            <div>
                              <h6>Comm Voice tuning</h6>
                              <p>
                                Lorem{' '}
                                <span className="d-inline-block text-mango-orange p-1 rounded">
                                  ipsum
                                </span>{' '}
                                dolor sit amet, consectetur.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* search results ends */}
                    {/* no result found starts */}
                    <div className="min-width-530 no-search-result d-none">
                      <div className="d-flex justify-content-center align-items-center gap-3 p-4">
                        <div>
                          <img src="/assets/no-data-icon.svg" alt="" />
                        </div>
                        <div className="d-flex flex-column">
                          <p className="mb-0 fw-medium text-primary fs-15px">
                            Sorry, no matches found!
                          </p>
                          <p className="mb-0  text-secondary fs-13px">
                            Please check the spelling or try a different keyword.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* no result found ends */}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <CircularProgressBar value="12" dataPercentage="30" />

          <ul className="d-flex gap-4 gap-xl-5 gap-lg-5 align-items-center header-right-sec">
            <li>
              <Notifications />
            </li>
            <li className="d-none d-md-block">
              <Social />
            </li>
            <li>
              <UserImage imgHeight="4" imgWidth="4" userDetails={userDetails} />
            </li>
            <li className="px-0 d-md-block">
              <DropDown />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

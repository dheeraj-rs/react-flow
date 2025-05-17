import React from 'react';

function HeaderSearch({ isMobile, showSearch, setShowSearch }) {
  return (
    <div>
      <nav
        id="headerMobSearch"
        className="ms-lg-65 ms-md-0 navbar-expand-lg  bg-white position-fixed  py-0 px-lg-3 px-md-0 w-100 header"
        style={{ display: showSearch && isMobile ? 'block' : 'none' }}
      >
        <div className="px-4 py-3">
          <ul className="row align-items-center">
            <div className="col-1">
              <a
                id="searchBackBtn"
                className="text-dark-blue fw-medium"
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSearch(false);
                }}
              >
                <img src="/assets/left-arrow-black.svg" alt="" className="me-3" />
              </a>
            </div>

            <div className="col-11">
              <li id="headerSearchWrap">
                <div className="">
                  <form id="myForm1">
                    <input
                      type="search"
                      className=" global-search-header global-search-new-search  global-search-new-mob"
                      placeholder="Navigate to.."
                    />
                  </form>
                </div>

                <div
                  id="search-suggestion"
                  className="search-suggestion scroll-custom  d-flex flex-column flex-lg-row bg-white rounded shadow-6 position-absolute top-100 d-none"
                >
                  {/* search results starts */}
                  <div>
                    <div id="searchResultOuterMob" className="min-width-300 p-4 bg-white rounded">
                      <div className="search-result">
                        <h5 className="text-dark fw-medium mb-4 fs-13px">
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
                                  <h6 className="mb-0">Comm Chat</h6>
                                  <a href="/#" className="view-setting">
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

                              <div>
                                <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4">
                                  <h6 className="mb-0">Comm Voice</h6>
                                  <a href="/#" className="view-setting">
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
                    <div className="no-search-result p-3 d-none">
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
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default HeaderSearch;

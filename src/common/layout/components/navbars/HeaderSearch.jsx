import React from 'react';

function HeaderSearch({ onClickBack }) {
  return (
    <nav
      id="headerMobSearch"
      className=" nav-header header ms-lg-65 ms-md-0 navbar navbar-expand-lg  bg-white position-fixed  py-0 px-lg-3 px-md-0"
    >
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row align-items-center gap-2">
          <a
            id="searchBackBtn"
            className="text-dark-blue fw-medium"
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              onClickBack();
            }}
          >
            <img src="/assets/left-arrow-black.svg" className="me-3" alt="" />
          </a>

          <li className="search-global ms-lg-5 ms-sm-0 search-global-icon-bg rounded">
            <div className="input-group  align-items-center">
              <span className="border-0 search-global-icon ">
                <a href="/#">
                  <img src="/assets/search-form.svg" alt="" />
                </a>
              </span>
              <input
                type="search"
                className="form-control global-search global-search-mob d-block"
                placeholder="Search"
              />
            </div>

            <div
              id="search-suggestion"
              className="search-suggestion d-flex d-none flex-column flex-lg-row bg-white rounded shadow-6 position-absolute top-100"
            >
              <div className="min-width-350 bg-white py-4 px-4 rounded">
                <div className="search-result">
                  <h5 className="text-dark fw-medium mb-4 fs-13px">Search results Tun (10)</h5>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <ul
                        className="nav nav-tabs flex-column search-navbar"
                        id="newtab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#setting-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected="true"
                          >
                            Settings (5)
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#chanel-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected="false"
                          >
                            Contacts (2)
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="accounts-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#accounts-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="accounts-tab-pane"
                            aria-selected="false"
                          >
                            Accounts (1)
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="disabled-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#disabled-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="disabled-tab-pane"
                            aria-selected="false"
                          >
                            Report (4)
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-8">
                      <div
                        className="tab-content scroll-custom pe-2 pe-lg-0"
                        id="experienceTabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="setting-tab-pane"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                          tabIndex="0"
                        >
                          <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4">
                            <h6 className="mb-0">Settings</h6>
                            <a href="/#" className="view-setting">
                              View all
                            </a>
                          </div>
                          <div className="d-flex d-flex gap-3 mb-2">
                            <div>
                              <img src="/assets/channel-msg.svg" alt="" />
                            </div>
                            <div>
                              <h6>Stored Responses</h6>
                              <p>Lorem ipsum dolor sit amet, consectetur.</p>
                            </div>
                          </div>

                          <div className="d-flex d-flex gap-3 mb-2">
                            <div>
                              <img src="/assets/channl-search.svg" alt="" />
                            </div>
                            <div>
                              <h6>Channel</h6>
                              <p>Lorem ipsum dolor sit amet, consectetur.</p>
                            </div>
                          </div>

                          <div className="d-flex d-flex gap-3 mb-2">
                            <div>
                              <img src="/assets/Microphone.svg" alt="" />
                            </div>
                            <div>
                              <h6>Comm Voice tuning</h6>
                              <p>Lorem ipsum dolor sit amet, consectetur.</p>
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4 ">
                            <h6 className="mb-0">Conversations</h6>
                            <a href="/#">View all</a>
                          </div>
                          <div className="d-flex gap-3">
                            <div>
                              <img src="/assets/blue-chat-icon.svg" className="mt-1" alt="" />
                            </div>
                            <div>
                              <p className="mb-1">
                                Thank you veru much
                                <span className="bg-border-gray-white rounded text-blue-active fw-500 px-1">
                                  Tun
                                </span>
                              </p>
                              <p>
                                <img src="/assets/watsapp-icon.svg" alt="" /> John_tuner11
                              </p>
                            </div>
                          </div>
                          <div className="d-flex gap-3">
                            <div>
                              <img src="/assets/blue-chat-icon.svg" className="mt-1" alt="" />
                            </div>
                            <div>
                              <p className="mb-1">
                                Thank you veru much
                                <span className="bg-border-gray-white rounded text-blue-active fw-500 px-1">
                                  Tun
                                </span>
                              </p>
                              <p>
                                <img src="/assets/watsapp-icon.svg" alt="" /> John_tuner11
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="chanel-tab-pane"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                          tabIndex="0"
                        >
                          content
                        </div>
                        <div
                          className="tab-pane fade"
                          id="accounts-tab-pane"
                          role="tabpanel"
                          aria-labelledby="accounts-tab"
                          tabIndex="0"
                        >
                          <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4">
                            <h6 className="mb-0">Accounts</h6>
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

                          <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-4 ">
                            <h6 className="mb-0">Reports</h6>
                            <a href="/#">View all</a>
                          </div>
                          <div className="d-flex gap-3">
                            <div>
                              <img src="/assets/business-report.svg" className="mt-1" alt="" />
                            </div>
                            <div>
                              <p className="mb-1 fw-500">Recent conversation report</p>
                              <p>Updated on: 23 Dec 2022</p>
                            </div>
                          </div>
                          <div className="d-flex gap-3">
                            <div>
                              <img src="/assets/business-report.svg" className="mt-1" alt="" />
                            </div>
                            <div>
                              <p className="mb-1 fw-500">Purchase report</p>
                              <p>Updated on: 23 Nov 2022</p>
                            </div>
                          </div>
                          <div className="d-flex gap-3">
                            <div>
                              <img src="/assets/business-report.svg" className="mt-1" alt="" />
                            </div>
                            <div>
                              <p className="mb-1 fw-500">Activity log report</p>
                              <p>Updated on: 23 Nov 2022</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="disabled-tab-pane"
                          role="tabpanel"
                          aria-labelledby="disabled-tab"
                          tabIndex="0"
                        >
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="back-setting d-none">
                    <div className="d-flex gap-3 mb-4">
                      <div>
                        <a href="/#" className="setting-details">
                          <img src="/assets/ArrowLeftb.svg" alt="" /> Back
                        </a>
                      </div>
                      <div>
                        Search results
                        <b>Tun</b> (5)
                      </div>
                    </div>
                    <h6 className="border-bottom mb-3 pb-2">Settings</h6>
                    <div className="d-flex d-flex gap-3 mb-2">
                      <div>
                        <img src="/assets/channel-msg.svg" alt="" />
                      </div>
                      <div>
                        <h6>Stored Responses</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur.</p>
                      </div>
                    </div>

                    <div className="d-flex d-flex gap-3 mb-2">
                      <div>
                        <img src="/assets/channl-search.svg" alt="" />
                      </div>
                      <div>
                        <h6>Channel</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur.</p>
                      </div>
                    </div>

                    <div className="d-flex d-flex gap-3 mb-2">
                      <div>
                        <img src="/assets/Microphone.svg" alt="" />
                      </div>
                      <div>
                        <h6>Comm Voice tuning</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HeaderSearch;

import React from 'react';
import UserImage from '../UserImage';

function SideNavRight() {
  return (
    <aside className="mobile-nav-right w-lg-nav w-md-nav-md position-fixed d-flex flex-column align-items-center flex-shrink-0 bg-white rounded-2 shadow-1 d-none d-lg-block">
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center drop-down-sidenav">
        {/* profile starts */}
        <li className="nav-item mb-3 dropdown">
          <a
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="avatar mt-4 h-4 w-4 h-lg-5 w-lg-5 d-inline-flex align-items-center justify-content-center text-center   text-uppercase bg-light-blue rounded-circle position-relative fs-3"
            href="/#"
          >
            {/* <img src="/assets/profile.svg" /> */}
          </a>
          <ul className="dropdown-menu dropdown-nav-right scroll-custom rounded drop-right-nav shadow-6 drop-first-box">
            <div className="card p-4 bg-white border-0  mb-3 rounded position-relative mb-3">
              <div className="d-flex flex-column align-items-center mb-4 text-center">
                <div className="ps-3 w-100">
                  <div className="d-flex flex-column align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <div className="card-round">
                        <div className="card-round">
                          <UserImage imgHeight="12" imgWidth="12" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="card-name fs-12px d-block fw-500 text-primary">
                        Gsoftcomm
                      </span>
                      <span className="text-gray-medium fs-12px d-block mt-2">
                        <a href="/#">
                          <i className="me-1">
                            <img src="/assets/location.svg" alt="" />
                          </i>
                        </a>
                        Location
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center my-3">
                <i className="me-2">
                  <img src="/assets/mail.svg" alt="" />
                </i>
                <a href="/#">name@example.com</a>
              </div>
              <div className="d-flex align-items-center">
                <i className="me-2">
                  <img src="/assets/call.svg" alt="" />
                </i>
                <a href="/#" className="text-primary fw-500">
                  +1 6573456228
                </a>
              </div>
              <div className="box-grey-footer bg-white rounded d-flex align-items-center p-3 mt-3 position-relative">
                <span>
                  <label className="text-secondary">Identifier:</label> 74474012152860
                </span>
                <a href="/#" className="ms-auto copy-button copy-identifier copy-icon ">
                  <img src="/assets/duplicate.svg" className="copy-img" alt="" />
                </a>
              </div>
            </div>
          </ul>
        </li>
        {/* profile ends */}

        {/* chat update starts */}
        <li className="nav-item mb-3 mt-2 dropdown">
          <a
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="nav-link  bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none"
            href="/#"
          >
            <div
              className="dropdown more drop-sidenav"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Chat Update"
              aria-label="ChatUpdate"
            >
              <img src="/assets/chat-info.svg" alt="" />{' '}
            </div>
          </a>

          <ul className="dropdown-menu dropdown-nav-right scroll-custom rounded drop-right-nav shadow-6">
            <div className="p-3 px-4 pt-4">
              <span className="text-primary d-block mb-4 fs-12px fw-500">Chat Update</span>
              <a
                href="/#"
                className="text-contrast-blue fs-12 fw-normal bg-transparent align-items-center rounded-pill py-1 px-2 chat-widget bg-white"
              >
                <i>
                  <img className="me-2" src="/assets/facebook.svg" alt="" />
                </i>
                Amanda_hug
              </a>

              <span className="d-block my-2 mt-4">
                <label className="text-primary">Last Seen: </label>
                <span className="text-secondary">13/03/2022 11:31 AM</span>
              </span>

              <span className="d-block my-2">
                <label className="text-primary">Created on: </label>
                <span className="text-secondary">13/03/2022 11:31AM</span>
              </span>
            </div>
          </ul>
        </li>
        {/* chat update ends */}

        {/* support desk starts */}

        <li className="nav-item mb-3 mt-2 dropdown">
          <a
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="nav-link  bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none"
            href="/#"
          >
            <div
              className="dropdown more drop-sidenav"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Support desk"
              aria-label="Support desk"
            >
              <img src="/assets/support-2.svg" alt="" />
            </div>
          </a>
          <ul className="dropdown-menu dropdown-nav-right scroll-custom rounded drop-right-nav shadow-6">
            <div className="p-3 px-4 pe-3">
              <span className="text-primary d-block mb-4 fs-12px fw-500">Support desk</span>
              <a href="/#" className="d-flex align-items-center text-blue-badge">
                <i className="me-2">
                  <img src="/assets/create-tckt.svg" alt="" />
                </i>
                Create Ticket
              </a>

              <div className="p-3 rounded-3 mt-4 bg-titan-white">
                <div className="d-flex  align-items-center">
                  <div>
                    <img className="me-3" src="/assets/help-support.svg" alt="" />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="fw-500">T12345 </div>
                    <div>Conversation with Paige Turner</div>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="d-block my-2">
                    <label className="text-secondary">Created on:</label>
                    <span className="text-primary">12/03/2022 11:31AM</span>
                  </span>

                  <span className="d-block my-2">
                    <label className="text-secondary">Due in:</label>
                    <span className="text-primary">13/03/2022 11:31AM</span>
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4">
                  <span className="rounded-3 fw-semibold text-uppercase py-2 px-2 fs-11 d-flex align-items-center justify-content-center bg-hawkes-blue text-royal-blue">
                    Open
                  </span>
                  <a href="/#">
                    <span className="text-secondary">
                      <i className="me-1">
                        <img src="/assets/no-agent-icon.svg" alt="" />
                      </i>
                      No agent
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </ul>
        </li>
        {/* support desk Ends */}

        {/* Device properties start */}

        <li className="nav-item mb-3 mt-2 dropdown">
          <a
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="nav-link  bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none"
            href="/#"
          >
            <div
              className="dropdown more drop-sidenav"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Device properties"
              aria-label="Device properties"
            >
              <img src="/assets/device-blue.svg" alt="" />
            </div>
          </a>
          <ul className="dropdown-menu dropdown-nav-right scroll-custom rounded drop-right-nav shadow-6">
            <div className="p-3 px-4 pe-3">
              <span className="text-primary d-block mb-4 fs-12px fw-500">Device properties</span>
              <span className="d-block my-2">
                <label className="text-secondary">OS: </label>
                <span className="text-primary">Web</span>{' '}
              </span>
              <span className="d-block my-2">
                <label className="text-secondary">Browser: </label>{' '}
                <span className="text-primary">Chrome</span>
              </span>
              <span className="d-block my-2">
                <label className="text-secondary">Browser version:</label>{' '}
                <span className="text-primary">103.0.0.0</span>
              </span>
              <span className="d-block my-2">
                <label className="text-secondary">Device: </label>{' '}
                <span className="text-primary">Desktop</span>
              </span>
            </div>
          </ul>
        </li>
        {/* Device properties ends */}

        {/* Recent chat starts */}
        <li className="nav-item mb-3 mt-2 dropdown">
          <a
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="nav-link  bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none"
            href="/#"
          >
            <div
              className="dropdown more drop-sidenav"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Recent conversations"
              aria-label="Recent conversations"
            >
              <img src="/assets/chat-recent.svg" alt="" />
            </div>
          </a>
          <ul className="dropdown-menu dropdown-nav-right scroll-custom rounded drop-right-nav shadow-6">
            <div className="p-3 px-4 pe-3">
              <span className="text-primary d-block mb-4 fs-12px fw-500">Recent conversations</span>
              <a
                href="/#"
                className="text-contrast-blue fs-12 fw-normal bg-transparent align-items-center rounded-pill py-1 px-2 chat-widget bg-white"
              >
                <i>
                  <img className="me-2" src="/assets/facebook.svg" alt="" />
                </i>
                Amanda_hug
              </a>
              <span className="d-block my-2 mt-4">
                Conversation with
                <a className="fw-500" href="/#">
                  Paige Turner
                </a>
              </span>
              <span className="d-block my-2">
                <label className="text-primary">Duration: </label>
                <span className="text-secondary">10 minutes</span>
              </span>
              <div className="d-flex mt-2">
                <span className="rounded-3 fw-semibold text-uppercase py-2 px-2 fs-11 d-flex align-items-center justify-content-center bg-hawkes-blue text-royal-blue">
                  Open
                </span>
              </div>
            </div>
          </ul>
        </li>
        {/* Recent chat ends */}

        {/* timeline starts */}
        <li className="nav-item mb-3 mt-2 dropdown">
          <a
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="nav-link  bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none"
            href="/#"
          >
            <div
              className="dropdown more drop-sidenav"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Timeline"
              aria-label="Timeline"
            >
              <img src="/assets/timeline-blue.svg" alt="" />
            </div>
          </a>
          <ul className="dropdown-menu dropdown-nav-right scroll-custom rounded drop-right-nav shadow-6">
            <div className="p-3 px-4 pe-3">
              <span className="text-primary d-block mb-4 fs-12px fw-500">Timeline</span>
              <div className="sidebar-timeline">
                <div className="user-timeline  user-date">
                  <div className="user-action p-3" />
                </div>
                <div className="user-timeline user-history">
                  <div className="user-action p-1">
                    <div className="text-primary">Sign into gsoftcomm</div>
                    <div className="text-santa-grey">5:30pm</div>
                  </div>
                </div>

                <div className="user-timeline user-history">
                  <div className="user-action  p-1">
                    <div className="text-primary">Sign into gsoftcomm</div>
                    <div className="text-santa-grey">5:30pm</div>
                  </div>
                </div>
                <div className="user-timeline  user-date">
                  <div className="user-action p-3" />
                </div>
                <div className="user-timeline user-history user-history-end">
                  <div className="user-action  p-1">
                    <div className="text-primary">Ticket has resolved</div>
                    <div className="text-santa-grey">5:30pm</div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </li>
        {/* timeline ends */}

        {/* chat transcript starts  */}
        <li className="nav-item mb-3 mt-2 dropdown  ">
          <a
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="nav-link  bg-transparent nav-logo py-3 d-flex align-items-center justify-content-center m-auto p-0  h-6 w-6 text-decoration-none"
            href="/#"
          >
            <div
              className="dropdown more drop-sidenav"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Chat transcript"
              aria-label="Chat transcript"
            >
              <img src="/assets/transcript-blue.svg" alt="" />
            </div>
          </a>
          <ul className="dropdown-menu dropdown-nav-pos  scroll-custom rounded drop-right-nav shadow-6">
            <div className="p-3 px-4 pe-3">
              <span className="text-primary d-block mb-4 fs-12px fw-500">Chat transcript</span>
              <div className="d-block mb-4">
                <label>Agent Steven Paul has joined the conversation</label>{' '}
              </div>
              <span className="mb-3 w-10 rounded-pill  text-uppercase py-2 px-2 fs-11 d-flex align-items-center justify-content-center bg-hawkes-blue text-royal-blue">
                05:13:20
              </span>
              <span className="d-block mb-4">
                <label>
                  <span className="text-primary fw-500">Paige Turner:</span>
                  Hello! Finally found the time to write to you I need your help in creating
                  interactive animations
                </label>{' '}
              </span>
              <span className="mb-3 w-10 rounded-pill  text-uppercase py-2 px-2 fs-11 d-flex align-items-center justify-content-center bg-hawkes-blue text-royal-blue">
                05:00:20
              </span>
              <span className="d-block mb-4">
                <label>
                  <span className="text-primary fw-500">Paige Turner:</span>
                  Can I send you files?
                </label>{' '}
              </span>
              <span className="mb-3 w-10 rounded-pill  text-uppercase py-2 px-2 fs-11 d-flex align-items-center justify-content-center bg-hawkes-blue text-royal-blue">
                04:13:20
              </span>
              <span className="d-block mt-4">
                <a href="/#">The visitor has left the conversation</a>
              </span>
              <span className="d-block mb-3 mt-3 text-orange">
                The conversation is ended (05:19:50)
              </span>
            </div>
          </ul>
        </li>
        {/* chat transcript ends  */}
      </ul>
    </aside>
  );
}

export default SideNavRight;

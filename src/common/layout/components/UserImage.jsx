import React from 'react';
import { clearLocalStorage, getDataFromLS } from '../../helpers/utils';

function UserImage({ userDetails }) {
  return (
    <div className="dropdown dropstart">
      <div
        className="avatar-header cursor-pointer h-5 w-5 h-lg-5 w-lg-5 d-inline-flex align-items-center justify-content-center text-center   text-uppercase bg-light-blue rounded-circle position-relative fs-3"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      />
      <ul
        className="dropdown-menu header-profile-dropdown p-4 shadow-7"
        aria-labelledby="dropdownMenuLink"
      >
        <li>
          <div>
            <div className="d-flex gap-3 align-items-start">
              <div>
                {/* <img src="/wallet/header-drop-image.svg" alt="" /> */}
                <img
                  alt=""
                  src={
                    userDetails?.data?.data?.attributes?.profile_photo_url ||
                    '../../../../public/assets/avathar-header.svg'
                  }
                />
              </div>
              <div>
                <h4 className="m-0 fs-15px fw-500">
                  {userDetails?.data?.data?.attributes?.first_name}{' '}
                  {userDetails?.data?.data?.attributes?.last_name}
                </h4>
                <p className="text-secondary fs-12px m-0">
                  {' '}
                  {userDetails?.data?.data?.attributes?.email}
                </p>
                <p className="m-0 fs-12px" style={{ color: '#FF8A00' }}>
                  Admin
                </p>
              </div>
            </div>
            <div>
              <ul className="mt-4">
                <li className="d-flex gap-3 align-items-center bg-titan-water-hover px-3 rounded">
                  <span>
                    <img src="/wallet/setting.svg" alt="" />
                  </span>
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Profile Settings
                  </a>
                </li>
                <li className="d-flex gap-3 align-items-center bg-titan-water-hover px-3 rounded">
                  <span>
                    <img src="/wallet/notify.svg" alt="" />
                  </span>
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Notification Preference
                  </a>
                </li>
                <li className="d-flex gap-3 align-items-center bg-titan-water-hover px-3 rounded">
                  <span>
                    <img src="/wallet/billing.svg" alt="" />
                  </span>
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Subscription and Billing
                  </a>
                </li>
                <li className="d-flex gap-3 align-items-center bg-titan-water-hover px-3 rounded">
                  <span>
                    <img className="me-2" src="/wallet/logout.svg" alt="" />
                  </span>
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
                    style={{ color: '#D21E1E' }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default UserImage;

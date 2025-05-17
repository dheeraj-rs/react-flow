/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

import Header from './components/Header';

// import SideNav from './components/navbars/SideNav';
import SideNavAdmin from './components/navbars/SideNavGsoftAdmin';
import SideNavMobile from './components/navbars/SideNavMobile';
import { GetUserProfile } from '../api-collection/TenantUser/Profile';
import { isSuperAdminFunction } from '../helpers/utils';
import HeaderSearch from './components/HeaderSearch';
import SideNavCustom from './components/SideNavCustom';
import { GetOrganizationProfile } from '../api-collection/TenantAdmin/Organization Profile';
import { GetAccounts } from '../api-collection/TenantAdmin/Accounts';

function Layout({ children, title, headerTitle, favIcon = '', active = '', sideNavIcon = '' }) {
  const isAdmin = isSuperAdminFunction();

  const [showSearch, setShowSearch] = useState(false);
  const [onMobileView, setOnMobileView] = useState({
    isMobile: false,
  });

  const organizationDetails = useQuery({
    queryKey: ['organizationrdetails'],
    queryFn: () => GetOrganizationProfile(),
  });

  const accountsList = useQuery({
    queryKey: ['accountsList'],
    queryFn: () => GetAccounts(),
  });

  const userDetails = useQuery({
    queryKey: ['userdetails'],
    queryFn: () => {
      if (!isAdmin) {
        return GetUserProfile();
      }
      return null;
    },
  });

  useEffect(() => {
    setOnMobileView({ ...onMobileView, isMobile: window.innerWidth <= 1180 });
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" type="image/svg+xml" href={favIcon} />
      </Helmet>

      <main className="page d-flex flex-column position-relative h-100">
        <SideNavAdmin
          isMobile={onMobileView?.isMobile}
          userDetails={userDetails}
          organizationDetails={organizationDetails}
          // accountsList={accountsList}
          active={active}
          sideNavIcon={sideNavIcon}
        />
        {/* <SideNav
          isMobile={onMobileView?.isMobile}
          userDetails={userDetails}
          organizationDetails={organizationDetails}
          // accountsList={accountsList}
          active={active}
          sideNavIcon={sideNavIcon}
        /> */}

        <SideNavCustom
          userDetails={userDetails}
          organizationDetails={organizationDetails}
          accountsList={accountsList}
        />

        <HeaderSearch
          isMobile={onMobileView?.isMobile}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
        <Header
          userDetails={userDetails}
          isMobile={onMobileView?.isMobile}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          title={headerTitle}
          avatarUrl={
            userDetails?.data?.data?.attributes?.profile_photo_url || '/svg/icons/user-gradient.svg'
          }
        />
        <div>{children}</div>
      </main>
      {/* <!-- off canvas sidebar for mobile starts --> */}
      <SideNavMobile sMobile={onMobileView?.isMobile} />
      {/* <div className="custom-sidebar-backdrop show" /> */}
      {/* <!-- off canvas sidebar for mobile ends --> */}
    </>
  );
}

export default Layout;

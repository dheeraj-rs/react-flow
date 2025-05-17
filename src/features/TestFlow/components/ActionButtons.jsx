import React from 'react';

function ActionButtons({ children }) {
  const isSmallDevice = window.innerWidth < 992;

  return (
    <div
      style={{
        width: '45px',
        position: 'absolute',
        right: isSmallDevice ? '30px' : '30px',
        top: '155px',
        // left: isSmallDevice ? '30px' : '96px',
        // bottom: '11px',
        // right: isSmallDevice ? '30px' : '30px',
        // bottom: '11px',
        zIndex: '111',
        userSelect: 'none',
        padding: '2px',
      }}
    >
      {children}
    </div>
  );
}

export default ActionButtons;

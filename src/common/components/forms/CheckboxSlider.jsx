import React from 'react';

function CheckboxSlider({ checked, onClick, name, onchange }) {
  const disabledStyle = {
    width: '28px',
    borderRadius: '50px',
    background: '#AFB5BF',
    height: '16px',
    position: 'relative',
  };

  const activeStyle = {
    width: '28px',
    borderRadius: '50px',
    background: '#645DF6',
    height: '16px',
    position: 'relative',
  };

  const toggleSwitchDisabled = {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '2.5px',
    transition: 'all ease 0.5s',
  };

  const toggleSwitchEnabled = {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 'calc(100% - 14px)',
    transition: 'all ease 0.5s',
  };

  const toggleCloseImage = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  };

  return (
    <div>
      <div
        className="toggle-outer cursor-pointer"
        style={checked ? activeStyle : disabledStyle}
        onMouseDown={onClick}
      >
        <div className="toggle-switch" style={checked ? toggleSwitchEnabled : toggleSwitchDisabled}>
          {checked ? (
            <img src="/bot-admin/toggle-check.svg" alt="" style={toggleCloseImage} />
          ) : (
            <img src="/bot-admin/toggle-close.svg" alt="" style={toggleCloseImage} />
          )}
        </div>
      </div>

      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="d-none"
        name={name}
        onChange={onchange}
      />
    </div>
  );
}

export default CheckboxSlider;

import React from 'react';

function Checkbox({
  title,
  id,
  onClick = () => {},
  checked = false,
  onChange = () => {},
  value,
  name,
  disabled,
}) {
  return (
    <div className="check-box" style={disabled ? { opacity: '60%' } : {}}>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label className="text-primary mb-0 color-blue-active-hover" htmlFor={id} onClick={onClick}>
        {title}
      </label>
    </div>
  );
}

export default Checkbox;

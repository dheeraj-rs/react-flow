import React from 'react';

function Input({
  label,
  id,
  placeholder,
  type,
  disabled,
  value,
  onChange,
  action,
  warningMessage,
  style,
  name = '',
  maxLength = '50',
  class1 = 'form-group w-100 mt-4',
}) {
  return (
    <div className={class1}>
      <label className="text-primary mb-1" htmlFor={id}>
        {label}
        <span className="text-dark fw-500">{action}</span>
      </label>
      <input
        type={type}
        className={`form-control ${disabled === true ? 'bg-white-azure' : 'bg-white'}`}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        style={style}
        name={name}
        value={value}
        maxLength={maxLength}
      />
      {warningMessage || null}
    </div>
  );
}

export default Input;

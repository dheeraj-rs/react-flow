import React from 'react';

function SearchWithBorder({ placeholderText, onChange, searchTerm = '', clearBtn, id }) {
  const closeStyle = {
    width: '10px',
    height: '10px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '10px',
    zIndex: '99',
    display: 'none',
    cursor: 'pointer',
  };

  // useEffect(() => {
  //   const customSearch = document.querySelectorAll('.custom_search');
  //   const searchClose = document.querySelectorAll('.search-clear');

  //   customSearch?.forEach((item) => {
  //     item.addEventListener('keyup', () => {
  //       if (item.value.length >= 1) {
  //         item.nextElementSibling.style.display = 'block';
  //       } else {
  //         item.nextElementSibling.style.display = 'none';
  //       }
  //     });
  //   });

  //   searchClose?.forEach((item) => {
  //     item.addEventListener('click', () => {
  //       item.previousElementSibling.value = '';
  //       item.style.display = 'none';
  //     });
  //   });
  // });

  const handleClear = (e) => {
    e.stopPropagation();
    clearBtn('');
  };

  return (
    <div
      className="input-group search-input-group custom-search-sidebar-border rounded overflow-hidden"
      style={{ height: '38px', border: '1px solid #afb5bf', outline: 'none' }}
    >
      <span className="input-group-text border-0 bg-white" id="basic-addon1">
        <img src="/assets/search-form.svg" alt="" />
      </span>
      <input
        type="text"
        className="form-control border-0 px-0 bg-white search-input pe-5 custom_search fs-12px fs-sm-13px py-0"
        style={{ height: '35px' }}
        value={searchTerm || ''}
        placeholder={placeholderText}
        onChange={onChange}
        aria-label="search"
        aria-describedby="basic-addon1"
        id={id}
      />
      <img
        src="/bot-admin/search-close.svg"
        alt=""
        className={`search-close search-clear ${searchTerm ? 'd-block' : 'd-none'}`}
        style={closeStyle}
        id=""
        onClick={handleClear}
      />
    </div>
  );
}

export default SearchWithBorder;

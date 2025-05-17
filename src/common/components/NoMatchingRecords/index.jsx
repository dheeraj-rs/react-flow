import React from 'react';
import '../../../styles/no-matching-records.css';

function NoMatchingRecords({ title = '', style = {} }) {
  return (
    <div className="no-matching-records" style={style}>
      {title || 'NO MATCHING RECORDS FOUND'}
    </div>
  );
}

export default NoMatchingRecords;

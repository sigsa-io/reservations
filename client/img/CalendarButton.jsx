import React from 'react';

// need to implement clickable logic
const SVG = (props) => {
  const viewBox = '0 0 5.24 8.07';
  const fill = '#23333';
  const { className } = props;

  return (
    <svg
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        fill={fill}
        d="M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z"
      />
    </svg>
  );

}

export default SVG;

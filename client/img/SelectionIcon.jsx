import React from 'react';
import propTypes from 'prop-types';

const SVG = ({
  className,
  viewBox,
  fill,
}) => (
  <svg
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z"
    />
  </svg>
);

SVG.propTypes = {
  className: propTypes.string.isRequired,
  viewBox: propTypes.string.isRequired,
  fill: propTypes.string.isRequired,
};

export default SVG;

import React from 'react';
import propTypes from 'prop-types';

const SVG = ({
  className,
  viewBox,
  fill,
}) => (
  <svg
    viewBox={viewBox}
    x="0px"
    y="0px"
    height="22"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,877.9c-208.7,0-377.9-169.2-377.9-377.9S291.3,122.1,500,122.1c208.7,0,377.9,169.2,377.9,377.9S708.7,877.9,500,877.9z"
    />
    <path
      fill={fill}
      d="M564.1,733.4c0,6.7-2.3,13.4-6.9,18.5c-4.6,5.1-10.6,7.7-16.6,7.7h-81.2c-6,0-12-2.6-16.6-7.7c-4.6-5.1-6.9-11.8-6.9-18.5v-43.7c0-6.7,2.3-13.4,6.9-18.5c4.6-5.1,10.6-7.7,16.6-7.7h81.2c6,0,12,2.6,16.6,7.7c4.6,5.1,6.9,11.8,6.9,18.5V733.4z"
    />
    <path
      fill={fill}
      d="M557.2,590.2c-4.6,3.4-10.6,5.1-16.6,5.1l-80.7-0.3c-6,0-11.9-1.7-16.5-5.1c-4.5-3.4-6.8-7.9-6.8-12.3l-0.5-123.3l0-193.7c0-4.5,2.3-9,6.9-12.4c4.6-3.4,10.6-5.1,16.5-5.1h81.2c6,0,12,1.7,16.5,5.1c4.6,3.4,6.9,7.9,6.9,12.4v192.2l0.1,125C564.1,582.3,561.8,586.8,557.2,590.2z"
    />

  </svg>
);

SVG.propTypes = {
  fill: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  viewBox: propTypes.string.isRequired,
};

export default SVG;

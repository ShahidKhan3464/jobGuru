import React from 'react';

const Instructors = ({ isActive, isHovered }) => {
  return (
    <svg
      width="52"
      height="53"
      viewBox="0 0 52 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1247_15241)">
        <path
          d="M37 21.478L27 17.478L17 21.478L27 25.478L37 21.478ZM37 21.478V27.478"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 23.0781V28.4781C21 29.2738 21.6321 30.0368 22.7574 30.5994C23.8826 31.1621 25.4087 31.4781 27 31.4781C28.5913 31.4781 30.1174 31.1621 31.2426 30.5994C32.3679 30.0368 33 29.2738 33 28.4781V23.0781"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1247_15241"
          x="-1"
          y="-3.52197"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="overlay"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1247_15241"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1247_15241"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Instructors;

import React from 'react';

const billing = ({ isActive, isHovered }) => {
  return (
    <svg
      width="52"
      height="53"
      viewBox="0 0 52 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1541_63647)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25 31.4785C29.9758 31.4785 32.2777 30.8394 32.5 28.2743C32.5 25.7109 30.8951 25.8757 30.8951 22.7305C30.8951 20.2738 28.5693 17.4785 25 17.4785C21.4307 17.4785 19.1049 20.2738 19.1049 22.7305C19.1049 25.8757 17.5 25.7109 17.5 28.2743C17.7232 30.8491 20.0251 31.4785 25 31.4785Z"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27 34.4785C25.8794 35.804 24.1313 35.8197 23 34.4785"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1541_63647"
          x="-3"
          y="-1.52148"
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
            result="effect1_dropShadow_1541_63647"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1541_63647"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default billing;

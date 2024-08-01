import React from 'react';

const courses = ({ isActive, isHovered }) => {
  return (
    <svg
      width="52"
      height="53"
      viewBox="0 0 52 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1288_20699)">
        <path
          d="M26 27.4785C26 28.2742 26.3161 29.0372 26.8787 29.5998C27.4413 30.1624 28.2044 30.4785 29 30.4785C29.7956 30.4785 30.5587 30.1624 31.1213 29.5998C31.6839 29.0372 32 28.2742 32 27.4785C32 26.6829 31.6839 25.9198 31.1213 25.3572C30.5587 24.7946 29.7956 24.4785 29 24.4785C28.2044 24.4785 27.4413 24.7946 26.8787 25.3572C26.3161 25.9198 26 26.6829 26 27.4785Z"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27 29.9785V34.4785L29 32.9785L31 34.4785V29.9785"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24 31.4785H19C18.4696 31.4785 17.9609 31.2678 17.5858 30.8927C17.2107 30.5177 17 30.009 17 29.4785V19.4785C17 18.3785 17.9 17.4785 19 17.4785H33C33.5304 17.4785 34.0391 17.6892 34.4142 18.0643C34.7893 18.4394 35 18.9481 35 19.4785V29.4785C34.9996 29.8292 34.9071 30.1737 34.7315 30.4774C34.556 30.781 34.3037 31.0332 34 31.2085"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 21.4785H32"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 24.4785H23"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 27.4785H22"
          stroke={isActive || isHovered ? 'white' : '#747474'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1288_20699"
          x="-2"
          y="-3.52148"
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
            result="effect1_dropShadow_1288_20699"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1288_20699"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default courses;

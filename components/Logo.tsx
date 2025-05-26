
import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="w-10 h-auto md:w-12"> 
      {/* The original SVG had viewBox="0 0 235 200". 
          To make it scale with width, we ensure aspect ratio is maintained.
          A simple approach for a fixed size is to directly use width/height on svg.
          Here, we use Tailwind for width and let height be auto based on viewBox.
      */}
      <svg
        viewBox="0 0 235 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full" // Ensure SVG scales within its container
        style={{ imageRendering: 'pixelated' }} // As suggested by framer HTML
      >
        <path
          d="m94.005 16.289 9.332-9.734c6.691-7.787 19.567-9.414 27.769-.608l98.837 106.12c8.145 8.745 6.021 22.797-4.345 28.744l-98.837 56.701c-6.811 3.907-14.546 2.957-20.123-1.067L9.325 140.618c-10.366-5.947-12.49-19.999-4.345-28.744a11.812 11.812 0 0 1 14.55-2.179l87.108 50.119v-37.648L49.802 89.674c-8.026-4.643-9.659-15.539-3.348-22.33l.012-.013.009-.01a14.441 14.441 0 0 1 17.779-2.654l42.384 24.013V52.34l-13.484-8.485c-8.26-4.77-15.716-9.779-9.215-16.758l10.066-10.808Z"
          fill="#FFFFFF" // White fill
        />
      </svg>
    </div>
  );
};

import React from "react";

interface FMLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const FMLogo: React.FC<FMLogoProps> = ({ className, width = 72, height = 24 }) => {
  // ViewBox and path data based on public/fm.svg, with fill forced to white
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-label="Freak Minimalism logo"
    >
      <g transform="translate(0,200) scale(0.1,-0.1)" fill="#ffffff" stroke="none">
        <path d="M550 1815 c0 -23 4 -25 45 -25 l45 0 0 -790 c0 -696 2 -790 15 -790 13 0 15 61 15 491 l0 490 83 -7 c45 -3 83 -7 85 -9 1 -1 9 -49 18 -106 30 -205 29 -619 -3 -821 -4 -30 -2 -39 11 -44 9 -4 19 -4 23 -1 3 3 12 55 20 114 18 125 21 533 5 653 -5 41 -8 77 -6 78 1 2 24 -25 49 -60 89 -120 164 -295 196 -458 13 -64 13 -65 22 -31 5 19 40 186 78 370 80 383 88 419 132 555 l32 98 5 -658 c5 -651 5 -659 25 -659 20 0 20 7 22 640 2 352 -1 699 -5 770 l-7 130 -46 -120 c-88 -227 -114 -324 -212 -800 l-33 -160 -18 55 c-43 130 -145 297 -248 406 l-48 51 52 7 c29 3 89 6 133 7 44 1 94 5 110 8 40 10 -279 25 -390 19 l-85 -4 0 288 0 288 390 0 390 0 0 25 0 25 -450 0 -450 0 0 -25z"/>
        <path d="M993 1687 l-83 -51 0 -106 0 -105 -66 -38 c-36 -21 -63 -41 -60 -44 3 -3 35 13 70 36 l66 41 81 -50 c44 -27 85 -50 91 -50 6 0 48 23 94 51 l84 52 0 108 0 108 -84 50 c-46 28 -90 51 -97 50 -8 0 -51 -24 -96 -52z m182 -5 l80 -48 3 -101 3 -101 -85 -51 -84 -51 -81 47 -81 48 1 105 0 105 77 47 c42 26 79 48 82 48 3 0 41 -22 85 -48z"/>
        <path d="M1030 1673 c-30 -19 -62 -38 -70 -43 -8 -5 -13 -11 -10 -14 3 -2 30 11 60 30 30 20 62 39 70 44 8 5 13 10 10 13 -3 2 -30 -11 -60 -30z"/>
        <path d="M1234 1530 c0 -52 1 -74 3 -47 2 26 2 68 0 95 -2 26 -3 4 -3 -48z"/>
        <path d="M950 1444 c1 -12 140 -95 140 -84 0 4 -21 21 -47 36 -27 15 -58 34 -70 42 -13 8 -23 10 -23 6z"/>
      </g>
    </svg>
  );
};

export default FMLogo;

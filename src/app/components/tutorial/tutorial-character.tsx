import React, { useEffect, useState } from "react";

interface TutorialCharacterProps {
  mouthAnimation?: boolean;
}

const TutorialCharacter: React.FC<TutorialCharacterProps> = ({
  mouthAnimation = true,
}) => {
  const [pathD, setPathD] = useState(
    "M111.5 119C105.5 123 99.5382 121.511 99.0382 121.465C98.5382 121.42 103.039 121.511 109.039 118.511C115.038 115.511 118.031 112.355 118.285 112.433C118.538 112.511 117.5 115 111.5 119Z"
  );
  const [ry, setRy] = useState(6);

  useEffect(() => {
    const closeOpenAnimation = () => {
      const closeInterval = setInterval(() => {
        setRy((prevRy) => {
          if (prevRy > 0) {
            return prevRy - 0.5;
          } else {
            clearInterval(closeInterval);
            openEyes();
            return 0;
          }
        });
      }, 20);
    };

    const openEyes = () => {
      // Open eyes
      const openInterval = setInterval(() => {
        setRy((prevRy) => {
          if (prevRy < 6) {
            return prevRy + 0.5;
          } else {
            clearInterval(openInterval);
            return 6;
          }
        });
      }, 20);
    };

    const cycleAnimation = () => {
      closeOpenAnimation();
    };

    const interval = setInterval(() => {
      cycleAnimation();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame = 0;

    if (mouthAnimation) {
      const interval = setInterval(() => {
        frame += 1;

        const bottomLipOffset = Math.sin(frame * 0.1) * 3;

        setPathD(
          `M111.5 119C105.5 123 99.5382 ${121.511 + bottomLipOffset} 99.0382 ${
            121.465 + bottomLipOffset
          }C98.5382 ${121.42 + bottomLipOffset} 103.039 ${
            121.511 + bottomLipOffset
          } 109.039 ${118.511 + bottomLipOffset}C115.038 ${
            115.511 + bottomLipOffset
          } 118.031 112.355 118.285 112.433C118.538 112.511 117.5 115 111.5 119Z`
        );

        if (frame > 200) {
          clearInterval(interval);
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [mouthAnimation]);

  return (
    <svg
      width="198"
      height="628"
      viewBox="0 0 198 628"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="character-tutorial">
        <path
          id="Vector"
          d="M132.5 3.46454C114.596 -0.611254 108.345 6.10687 99 21.3942C89.6547 6.10687 83.4037 -0.93697 65.5 3.13882C47.5963 7.21461 7.28699 68.5026 2 126.655C3.25342 152.627 6.04156 163.96 17.6043 173.969C81.2192 206.097 116.885 205.688 180.5 173.969C192.063 163.96 194.747 152.953 196 126.98C190.713 68.8283 150.404 7.54033 132.5 3.46454Z"
          fill="#B08B60"
          stroke="#B08B60"
          stroke-width="3"
          stroke-linecap="round"
        />
        <rect
          id="Rectangle 4"
          x="90"
          y="137"
          width="20"
          height="18"
          fill="#EDAB6E"
        />
        <path
          id="Rectangle 1"
          d="M55 49H144V97.5C144 122.077 124.077 142 99.5 142C74.9233 142 55 122.077 55 97.5V49Z"
          fill="#EDAB6E"
        />
        <path
          id="Vector 14"
          d="M109.5 141.5C102.07 142.818 97.8044 142.843 90 141.5V152L109.5 145.5V141.5Z"
          fill="#CC8F57"
          stroke="#CC8F57"
        />
        <ellipse
          id="Ellipse 1"
          cx="78.5"
          cy="76"
          rx="4.5"
          ry={ry}
          fill="#423B3B"
        />
        <ellipse
          id="Ellipse 2"
          cx="120.5"
          cy="76"
          rx="4.5"
          ry={ry}
          fill="#423B3B"
        />
        <path
          id="Vector 3"
          d="M67 73C70.4506 65.7794 74.035 64.2198 83 65.3173"
          stroke="#8A4709"
          stroke-width="0.5"
          stroke-linecap="round"
        />
        <path
          id="Vector 4"
          d="M133 73C129.549 65.7794 125.965 64.2198 117 65.3173"
          stroke="#8A4709"
          stroke-width="0.5"
          stroke-linecap="round"
        />
        <path
          id="Rectangle 3"
          d="M72 48.5H54V66.5L55.7886 65.7051C63.2805 62.3754 69.1213 56.1765 72 48.5Z"
          fill="#B08B60"
        />
        <path
          id="Rectangle 5"
          d="M125 49H144V67L141.645 66.0082C134.037 62.805 128.038 56.6752 125 49Z"
          fill="#B08B60"
        />
        <path
          id="Vector 10"
          d="M159 228C161 221.5 162 198.5 162 198.5C162 198.5 168 162.5 148 156C128 149.5 40.7152 147.694 34.0001 167C26 190 39 224.5 39 228C39 231.5 52 343.5 52 343.5C52 343.5 62.9999 357 97.9999 356C133 355 141.5 343.5 141.5 343.5C141.5 339 157 234.5 159 228Z"
          fill="#65AAEB"
        />
        <path
          id="Vector 20"
          d="M94.0276 225.12C81.2501 240.966 64.9221 245.204 51.9999 229.264"
          stroke="#5A96CE"
          stroke-opacity="0.7"
          stroke-width="3"
        />
        <path
          id="Vector 27"
          d="M102.972 225.12C115.75 240.966 132.078 245.204 145 229.264"
          stroke="#5A96CE"
          stroke-opacity="0.7"
          stroke-width="3"
        />
        <path
          id="Vector 11"
          d="M98.4655 81C89.9851 104.247 89.7057 110.475 98.4655 107.5"
          stroke="#B47C49"
        />
        <path
          id="Vector 12"
          d="M76.5 25C76.3287 54.7405 59 71.5 34 72"
          stroke="#96754F"
        />
        <path
          id="Vector 13"
          d="M121 25C121.171 54.7405 138.5 71.5 163.5 72"
          stroke="#96754F"
        />
        <path
          id="Vector 17"
          d="M65.6941 150.369L61.4212 127.58C61.041 125.552 63.6676 124.301 65.0737 125.811C72.1757 133.437 78.064 137.257 87.6221 140.539C88.4405 140.82 89 141.585 89 142.451V150C89 151.105 88.1046 152 87 152H67.6599C66.6974 152 65.8715 151.315 65.6941 150.369Z"
          fill="#9A7C59"
          stroke="#9A7C59"
        />
        <path
          id="Vector 22"
          d="M50.3376 601.501C49.8376 601.501 45.3376 366.501 50.3376 367.001C55.3376 367.501 90.3376 378.001 92.3376 379.001C94.3376 380.001 66.8376 601.501 66.3376 601.501H50.3376Z"
          fill="#2B2F32"
          stroke="#2B2F32"
          stroke-width="4"
        />
        <path
          id="Vector 24"
          d="M139.104 597.501C139.604 597.501 144.104 362.501 139.104 363.001C134.104 363.501 99.1038 374.001 97.1038 375.001C95.1038 376.001 122.604 597.501 123.104 597.501H139.104Z"
          fill="#2B2F32"
          stroke="#2B2F32"
          stroke-width="4"
        />
        <path
          id="Vector 23"
          d="M140.472 345.266C106.425 358.424 86.008 358.411 52.2427 345.229C51.9454 345.113 51.6109 345.294 51.5637 345.61C51.0089 349.322 48.2871 368.954 51.6573 376C55.3863 383.796 141.022 384.907 141.157 376C141.278 368.045 141.183 349.57 141.161 345.714C141.16 345.363 140.799 345.14 140.472 345.266Z"
          fill="#2B2F32"
          stroke="#2B2F32"
          stroke-width="4"
        />
        <path
          id="Vector 25"
          d="M48.6999 602H66.0469C67.133 602 68.0208 602.867 68.0573 603.952C68.1944 608.024 68.416 612.309 68.1344 616.077C68.0707 616.93 67.4398 617.623 66.6032 617.8C47.1245 621.925 25.6728 624.234 5.34585 626.863C3.57044 627.093 2.47334 625.111 3.73447 623.841C14.4151 613.08 32.8346 605.198 48.3055 602.039C48.4358 602.013 48.567 602 48.6999 602Z"
          fill="#7C6346"
          stroke="#7C6346"
        />
        <path
          id="Vector 26"
          d="M140.571 598H123.224C122.138 598 121.25 598.867 121.213 599.952C121.076 604.024 120.855 608.309 121.136 612.077C121.2 612.93 121.831 613.623 122.667 613.8C142.146 617.925 163.598 620.234 183.925 622.863C185.7 623.093 186.797 621.111 185.536 619.841C174.855 609.08 156.436 601.198 140.965 598.039C140.835 598.013 140.704 598 140.571 598Z"
          fill="#7C6346"
          stroke="#7C6346"
        />
        <g id="desna ruka s notebookom">
          <g id="Group 6">
            <path
              id="Rectangle 7"
              d="M33.1406 171.8C34.215 165.563 39.6238 161.007 45.9519 161.007L48.317 161.007C56.624 161.007 62.7999 168.691 61.0126 176.804L38.9989 276.723C37.6494 282.848 31.7438 286.848 25.5552 285.827C19.0927 284.761 14.7348 278.636 15.8468 272.181L33.1406 171.8Z"
              fill="#65AAEB"
            />
            <g id="Vector 28" filter="url(#filter0_d_307_80)">
              <path
                d="M52 212L41 266"
                stroke="#5A96CE"
                stroke-opacity="0.5"
                shape-rendering="crispEdges"
              />
            </g>
          </g>
          <g id="notebook">
            <g id="Group 3">
              <g id="book">
                <rect
                  id="Rectangle 12"
                  x="43.9116"
                  y="376.202"
                  width="91.6622"
                  height="50"
                  transform="rotate(-20.1502 43.9116 376.202)"
                  fill="#FAB6B6"
                />
                <path
                  id="Vector 30"
                  d="M143.712 393.652L127.453 350.018L128.58 348.033L144.417 392.262L143.712 393.652Z"
                  fill="white"
                  stroke="white"
                />
                <path
                  id="Vector 31"
                  d="M44.3085 379.764L44.8973 377.445L127.731 347.681L126.819 349.589L44.3085 379.764Z"
                  fill="white"
                  stroke="white"
                />
                <rect
                  id="Rectangle 11"
                  x="41.4922"
                  y="381.437"
                  width="91.6622"
                  height="50"
                  transform="rotate(-20.1502 41.4922 381.437)"
                  fill="#FAB6B6"
                />
                <path
                  id="Vector 32"
                  d="M123.438 352.901C119.843 348.935 119.857 342.065 122.55 347.382"
                  stroke="#6D6161"
                />
                <path
                  id="Vector 33"
                  d="M111.77 357.4C108.175 353.434 108.19 346.563 110.882 351.881"
                  stroke="#6D6161"
                />
                <path
                  id="Vector 34"
                  d="M99.5118 361.727C95.9163 357.761 95.9312 350.891 98.6238 356.208"
                  stroke="#6D6161"
                />
                <path
                  id="Vector 35"
                  d="M87.253 366.055C83.6575 362.089 83.6724 355.219 86.365 360.536"
                  stroke="#6D6161"
                />
                <path
                  id="Vector 36"
                  d="M74.9947 370.383C71.3992 366.416 71.4141 359.546 74.1067 364.863"
                  stroke="#6D6161"
                />
                <path
                  id="Vector 37"
                  d="M62.7359 374.71C59.1404 370.744 59.1553 363.874 61.8479 369.191"
                  stroke="#6D6161"
                />
                <path
                  id="Vector 38"
                  d="M50.4771 379.038C46.8816 375.072 46.8965 368.201 49.5891 373.519"
                  stroke="#6D6161"
                />
              </g>
            </g>
          </g>
          <g id="podlaktica desna">
            <g id="Rectangle 8" filter="url(#filter1_d_307_80)">
              <path
                d="M22.2155 291.248C19.9055 285.632 22.6808 279.217 28.3553 277.055V277.055C34.1392 274.852 40.5876 277.953 42.4768 283.847L51.5001 312L62.3768 341.696C64.0727 346.326 61.7171 351.458 57.1003 353.191V353.191C52.5597 354.895 47.4865 352.685 45.6416 348.2L22.2155 291.248Z"
                fill="#D9D9D9"
              />
            </g>
            <path
              id="Vector 9"
              d="M67.0005 361.667C67.0005 361.667 71.0005 360.167 72.0005 361.667C73.0005 363.167 74.0005 367.667 74.0005 367.667"
              stroke="#EDAB6E"
              stroke-width="6"
              stroke-linecap="round"
            />
            <path
              id="Subtract"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.8067 267.649C20.3356 268.583 15.783 276.349 18.6171 283.324L51.4722 364.186L68.7251 357.712L40.044 275.251C38.2689 270.148 33.1683 266.979 27.8067 267.649Z"
              fill="#65AAEB"
            />
            <path
              id="Subtract_2"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M51.0215 363.988L60.0668 385.645C61.8488 389.911 66.6869 392.003 71.0159 390.379C75.3448 388.755 77.6129 383.997 76.1487 379.611L68.817 357.651L51.0215 363.988Z"
              fill="#EDAB6E"
            />
          </g>
        </g>
        <path
          id="Vector 15"
          d="M70 153.5C42.7083 154.301 42.7385 158.5 37.2385 161.5C31.7385 164.5 28.9108 182.954 37.2385 180.5C45.5661 178.046 69.6608 159.28 69.6608 159.28L70 153.5Z"
          fill="#649CCF"
        />
        <g id="Group 8">
          <g id="Group 3_2">
            <g id="Rectangle 6" filter="url(#filter2_d_307_80)">
              <path
                d="M174.837 284.185C177.257 278.254 174.291 271.274 168.334 268.879C162.377 266.484 155.858 269.652 154.039 275.825L134.629 341.712C133.458 345.686 135.549 350.015 139.384 351.556C143.218 353.098 147.451 351.311 149.009 347.493L174.837 284.185Z"
                fill="#EDAB6E"
              />
            </g>
            <path
              id="Rectangle 7_2"
              d="M176.513 279.983C178.848 273.979 175.82 267.004 169.833 264.598C163.846 262.191 157.284 265.31 155.357 271.479L122.31 377.256C121.081 381.189 123.134 385.525 126.951 387.06C130.769 388.594 134.977 386.775 136.466 382.947L176.513 279.983Z"
              fill="#EDAB6E"
            />
            <g id="Group 2">
              <path
                id="Subtract_3"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M170.535 263.747C177.249 266.447 180.619 274.291 177.948 281.002L144.8 364.285L128.182 357.603L154.357 271.516C156.466 264.579 163.82 261.048 170.535 263.747Z"
                fill="#65AAEB"
              />
            </g>
          </g>
          <path
            id="Vector 9_2"
            d="M130.068 361.669C130.068 361.669 126.335 360.169 125.402 361.669C124.469 363.169 123.535 367.669 123.535 367.669"
            stroke="#EDAB6E"
            stroke-width="6"
            stroke-linecap="round"
          />
        </g>
        <g id="Group 9">
          <path
            id="Vector_2"
            d="M160.709 170.283C159.498 163.55 153.006 159.259 146.341 160.787C139.799 162.286 135.589 168.825 136.933 175.399L157.934 278.114C159.139 284.008 164.863 287.71 170.733 286.392C176.529 285.09 180.322 279.372 179.271 273.523L160.709 170.283Z"
            fill="#65AAEB"
          />
          <g id="Rectangle 9" filter="url(#filter3_d_307_80)">
            <path
              d="M150.54 213.23C150.534 213.195 150.525 213.161 150.512 213.128C150.286 212.525 149.382 212.786 149.486 213.424L158.557 269.27C158.645 269.809 159.413 269.803 159.515 269.262C159.525 269.206 159.526 269.149 159.517 269.093L150.54 213.23Z"
              fill="#65AAEB"
            />
          </g>
        </g>
        <path
          id="Ellipse 5"
          d="M134 165.5C134 180.688 120.908 191.829 100.474 191.829C80.0391 191.829 63.5 179.688 63.5 164.5C61.99 149.261 61.7392 151.407 100.473 151.5C139.208 151.593 134 150.312 134 165.5Z"
          fill="#EDAB6E"
        />
        <path
          id="Vector 16"
          d="M89.1522 151.481C75.5255 150.746 64.8166 152.279 64.5068 152.973C64.4983 152.992 64.4963 153.01 64.4889 153.029L63.1081 156.712C63.0572 156.847 63.1627 156.99 63.3072 156.982L86.7232 155.588C86.7863 155.585 86.844 155.551 86.8786 155.498L89.31 151.79C89.3944 151.661 89.306 151.489 89.1522 151.481Z"
          fill="#CC8F57"
          stroke="#CC8F57"
          stroke-width="0.5"
        />
        <path
          id="mouth"
          d={pathD}
          fill="#B47C49"
          stroke="#B47C49"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_307_80"
          x="37.5103"
          y="211.9"
          width="19.9795"
          height="62.1997"
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
          <feOffset dx="1" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_307_80"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_307_80"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_307_80"
          x="21.4009"
          y="267.044"
          width="61.8259"
          height="96.0207"
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
          <feOffset dx="11" />
          <feGaussianBlur stdDeviation="4.65" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_307_80"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_307_80"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_307_80"
          x="116.304"
          y="259.078"
          width="59.3779"
          height="102.031"
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
          <feOffset dx="-9" />
          <feGaussianBlur stdDeviation="4.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_307_80"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_307_80"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_307_80"
          x="141.378"
          y="209.688"
          width="18.1454"
          height="63.0832"
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
          <feOffset dx="-5" />
          <feGaussianBlur stdDeviation="1.55" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_307_80"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_307_80"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default TutorialCharacter;

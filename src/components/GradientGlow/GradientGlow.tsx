import React from 'react';

const GradientGlow: React.FC<{}> = () => {
    return (
        <svg
            className="position-absolute"
            xmlns="http://www.w3.org/2000/svg"
            width="734"
            height="716"
            fill="none"
            style={{ zIndex: -1 }}
            viewBox="0 0 734 716"
        >
            <g filter="url(#filter0_f_1307_6837)" opacity="0.5">
                <circle cx="297.5" cy="418.5" r="97.5" fill="#9327FF"></circle>
            </g>
            <g filter="url(#filter1_f_1307_6837)" opacity="0.5">
                <circle cx="436.5" cy="297.5" r="97.5" fill="#FFA927"></circle>
            </g>
            <defs>
                <filter
                    id="filter0_f_1307_6837"
                    width="595"
                    height="595"
                    x="0"
                    y="121"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur
                        result="effect1_foregroundBlur_1307_6837"
                        stdDeviation="100"
                    ></feGaussianBlur>
                </filter>
                <filter
                    id="filter1_f_1307_6837"
                    width="595"
                    height="595"
                    x="139"
                    y="0"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feGaussianBlur
                        result="effect1_foregroundBlur_1307_6837"
                        stdDeviation="100"
                    ></feGaussianBlur>
                </filter>
            </defs>
        </svg>
    );
};

export default GradientGlow;

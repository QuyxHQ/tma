import React from "react";

// Define IconProps type
interface IconProps {
  className?: string;
  fill?: string;
  handleClick?: React.MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const Edit: React.FC<IconProps> = ({ className, fill = 'none', handleClick, size = 24 }) => {
  const Icon: React.FC = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={fill}
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        className={`icon icon-tabler icon-tabler-pencil ${className}`}
        viewBox="0 0 24 24"
        onClick={handleClick}
      >
        <path stroke="none" d="M0 0h24v24H0z"></path>
        <path d="M4 20h4L18.5 9.5a2.828 2.828 0 10-4-4L4 16v4M13.5 6.5l4 4"></path>
      </svg>
    );
  };

  return <Icon />;
};

export default Edit;


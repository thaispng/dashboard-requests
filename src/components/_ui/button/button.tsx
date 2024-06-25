import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  Icon: React.ElementType;
}

export default function Button({ text, onClick, Icon }: ButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center button-primary px-4 py-2 rounded-md border-color border-[1px] text-[#805ad5] text-sm font-semibold transition duration-300 ease-in-out mb-4 md:mb-0 md:ml-4 hidden sm:flex">
      {Icon && <Icon className="mr-2" />}
      {text}
    </button>
  );
}

import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  Icon: React.ElementType;
}

export default function Button({ text, onClick, Icon }: ButtonProps) {
  return (
    <button onClick={onClick} className=" flex items-center container-secondary px-4 py-2 rounded-md border-color border-[1px] text-[#805ad5] text-sm font-semibold hover:bg-[#EBE8EE] transition duration-300 ease-in-out">
      {Icon && <Icon className="mr-2" />}
      {text}
    </button>
  );
}
import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  Icon: React.ElementType;
}

export default function Button({ text, onClick, Icon }: ButtonProps) {
  return (
    <button onClick={onClick} className="your-button-class flex items-center">
      {Icon && <Icon className="mr-2" />}
      {text}
    </button>
  );
}
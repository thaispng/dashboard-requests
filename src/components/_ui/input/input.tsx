import React from 'react';

interface InputProps {
    placeholder: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Icon: React.ElementType; 
}

export default function Input({ placeholder, type, onChange, Icon }: InputProps) {
  return (
    <div className='flex flex-row container-secondary items-center text-tertiary w-[300px] h-[auto] rounded-md p-2 border-color border-2 focus-within:border-[#805ad5]'>
      <div className='flex justify-center items-center'>
        {Icon && <Icon className="icon-color mr-2 items-center" />} 
      </div>
      <input 
        className='w-full h-full px-2 bg-transparent border-none outline-none shadow-none' 
        placeholder={placeholder} 
        type={type} 
        onChange={onChange}
      />
    </div>
  );
}

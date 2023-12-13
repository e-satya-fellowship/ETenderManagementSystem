import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

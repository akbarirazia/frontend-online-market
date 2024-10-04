import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg'>
        {/* Close Button */}
        <button
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          ✖️
        </button>

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { IoMdArrowBack, IoMdCloseCircle } from 'react-icons/io';
import { AuthContext } from '../../context/AuthContext';
import Button from '../reusable/Button';
import { TiMessages } from 'react-icons/ti';
import {
  sendServiceRequest,
  showServices,
} from '../../services/RequestService';
import { toast, ToastContainer } from 'react-toastify';

function RequestServiceModal({ onClose, id }) {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [error, setError] = useState('');
  const [services, setServices] = useState([]);
  const { isAuthenticated, userData } = useContext(AuthContext);
  const providerId = id;
  const userId = userData.id;

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await showServices();
        setServices(data);
        if (data.length > 0) {
          setSelectedServiceId(data[0].id);
        } else {
          setSelectedServiceId(null);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      }
    };
    loadServices();
  }, []);

  function handleMessageChange(e) {
    setError('');
    setMessage(e.target.value);
  }

  function handleServiceChange(e) {
    setSelectedServiceId(e.target.value);
  }

  async function sendRequest() {
    if (!message) {
      setError('You cannot send an empty message');
      return;
    }

    try {
      await sendServiceRequest(userId, selectedServiceId, message, providerId);
      toast.success('Service request sent successfully!');
      alert('Service request sent successfully!');
      onClose();
    } catch (err) {
      console.error('Failed to send service request:', err);
      setError('Failed to send service request. Please try again.');
    }
  }

  return (
    <>
      {' '}
      <ToastContainer autoClose={10000} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Smooth and fast fade-in
        transition={{ duration: 0.000002 }} // Set duration to make the modal appear quickly
        exit={{ opacity: 0 }}
      >
        {/* Move ToastContainer here to ensure it works globally */}
        {/* Desktop View */}

        <div className='hidden md:block fixed inset-0 z-40'>
          <div
            className='bg-black bg-opacity-50 fixed inset-0 w-full h-full z-40' // Ensure this is layered above the content
            onClick={onClose}
          ></div>
          <main className='flex items-center justify-center  z-50  h-full w-full relative'>
            <div className='modal-wrapper flex items-center  z-50  relative xl:w-[50%] justify-center'>
              <div className='max-w-md mx-5 xl:max-w-3xl bg-white max-h-[90vh] shadow-lg rounded-lg relative w-full'>
                <div className='flex items-center justify-between p-4 border-b'>
                  <h1 className='font-semibold text-2xl text-center flex-1'>
                    Request Service
                  </h1>
                  <IoMdCloseCircle
                    size={30}
                    onClick={onClose}
                    cursor={'pointer'}
                    className='hover:scale-110 z-50'
                  />
                </div>

                {/* Modal Body */}
                <div className='px-6 py-4'>
                  {isAuthenticated ? (
                    <>
                      <div className='mb-4'>
                        <label
                          htmlFor='service'
                          className='block text-gray-700 font-medium mb-2'
                        >
                          Select a Service
                        </label>
                        <select
                          id='service'
                          value={selectedServiceId}
                          onChange={handleServiceChange}
                          className='w-full border border-gray-300 rounded-md p-2 focus:outline-[#720D96]'
                        >
                          {services.length > 0 ? (
                            services.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.title}
                              </option>
                            ))
                          ) : (
                            <option>No services available</option>
                          )}
                        </select>
                      </div>

                      <div className='mb-4'>
                        <label
                          htmlFor='message'
                          className='block text-gray-700 font-medium mb-2'
                        >
                          Message
                        </label>
                        <textarea
                          id='message'
                          cols={50}
                          rows={5}
                          onChange={handleMessageChange}
                          className='w-full border border-gray-300 rounded-md p-2 focus:outline-[#720D96] resize-none'
                          value={message}
                          placeholder='Please type your message'
                        ></textarea>
                        {error && (
                          <p className='text-xs text-red-500 mt-1'>{error}</p>
                        )}
                      </div>

                      <p className='text-xs text-gray-500 mb-4'>
                        Don't share your email address, phone number, or
                        financial information.
                      </p>

                      <div className='flex items-center justify-end gap-4'>
                        <Button
                          onClick={onClose}
                          className='border border-[#720D96] bg-white py-2 px-4 rounded-md font-medium hover:bg-[#720D96] hover:text-white'
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={sendRequest}
                          className='border border-[#720D96] bg-white flex items-center gap-2 py-2 px-4 rounded-md font-medium hover:bg-[#720D96] hover:text-white'
                        >
                          <TiMessages size={20} /> Send Request
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p className='text-center text-lg'>
                      Please log in to request a service.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* Mobile View */}
        <div className='md:hidden bg-white fixed inset-0 z-30 overflow-y-auto'>
          <div className='flex items-center justify-between p-4 border-b'>
            <div
              onClick={onClose}
              className='flex items-center gap-2 cursor-pointer'
              onMouseEnter={() => setMouseEnter(true)}
              onMouseLeave={() => setMouseEnter(false)}
            >
              <IoMdArrowBack
                size={25}
                className={`${
                  mouseEnter ? 'transition ease-in-out w-8 duration-500' : ''
                }`}
              />
              <p className='text-lg'>Request Service</p>
            </div>
          </div>

          <div className='px-4 py-4'>
            {isAuthenticated ? (
              <>
                <div className='mb-4'>
                  <label
                    htmlFor='service-mobile'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Select a Service
                  </label>
                  <select
                    id='service-mobile'
                    value={selectedServiceId}
                    onChange={handleServiceChange}
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-[#720D96]'
                  >
                    {services.length > 0 ? (
                      services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))
                    ) : (
                      <option>No services available</option>
                    )}
                  </select>
                </div>

                <div className='mb-4'>
                  <label
                    htmlFor='message-mobile'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Message
                  </label>
                  <textarea
                    id='message-mobile'
                    cols={30}
                    rows={5}
                    onChange={handleMessageChange}
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-[#720D96] resize-none'
                    value={message}
                    placeholder='Please type your message'
                  ></textarea>
                  {error && (
                    <p className='text-xs text-red-500 mt-1'>{error}</p>
                  )}
                </div>

                <p className='text-xs text-gray-500 mb-4'>
                  Don't share your email address, phone number, or financial
                  information.
                </p>

                <div className='flex items-center justify-end gap-4'>
                  <Button
                    onClick={onClose}
                    className='border border-[#720D96] bg-white py-2 px-4 rounded-md font-medium hover:bg-[#720D96] hover:text-white'
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={sendRequest}
                    className='border border-[#720D96] bg-white flex items-center gap-2 py-2 px-4 rounded-md font-medium hover:bg-[#720D96] hover:text-white'
                  >
                    <TiMessages size={20} /> Send Request
                  </Button>
                </div>
              </>
            ) : (
              <p className='text-center text-lg'>
                Please log in to request a service.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default RequestServiceModal;

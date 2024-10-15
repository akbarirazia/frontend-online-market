/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import {
  IoMdArrowBack,
  IoMdCloseCircle,
  IoMdSearch,
  IoIosNotificationsOff,
} from 'react-icons/io';
import { motion } from 'framer-motion';
import axios from 'axios';

import noNotificationIllustration from '../../assets/nonotifications.png';
import ImageLoader from '../reusable/ImageLoader';
import { AuthContext } from '../../context/AuthContext';
import { fetchNotifications } from '../../services/GetNotification';
import { ModalContext } from '../../context/ModalContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function NotificationModal({ onClose }) {
  const [mouseEnter, setMouseEnter] = useState(false);
  const { isAuthenticated, userData } = useContext(AuthContext);
  const { notifications, isLoading, setNotifications } =
    useContext(ModalContext);

  // Function to handle the read/unread toggle
  const handleReadStatusChange = async (id, currentReadStatus) => {
    const newReadStatus = !currentReadStatus; // Toggle the read status

    try {
      await axios.patch(`${API_BASE_URL}/api/notification/${id}`, {
        read: newReadStatus,
      });
      // Update the notification read status in the state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: newReadStatus }
            : notification
        )
      );
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <div className=''>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[80] transition-all duration-500'
      >
        {/* Modal Backdrop */}
        <div
          className='bg-black bg-opacity-50 fixed inset-0 w-full h-full z-30'
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <main className='flex flex-col items-center justify-center h-full w-full relative'>
          <div className='modal-wrapper flex items-center z-30 relative xl:w-[70%] justify-center'>
            <div className='max-w-md mx-5 w-full xl:max-w-3xl bg-white min-h-[60vh] max-h-[90vh] shadow-lg rounded-lg relative overflow-hidden'>
              {/* Modal Header */}
              <div className='flex items-center justify-between p-4 w-full border-b'>
                <h1 className='font-semibold text-xl text-center flex-1'>
                  Notifications
                </h1>
                <IoMdCloseCircle
                  size={40}
                  onClick={onClose}
                  cursor={'pointer'}
                  className='bg-white rounded-full transition ease-in-out hover:scale-110 duration-300 z-50'
                />
              </div>

              {/* Notifications List */}
              <div className='overflow-y-auto max-h-[65vh]'>
                {isLoading ? (
                  <p className='text-center text-lg p-4'>
                    Loading notifications...
                  </p>
                ) : notifications.length > 0 ? (
                  <ul className='p-4 space-y-3'>
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className={`${
                          !notification.read ? 'bg-gray-100' : 'bg-gray-300'
                        } hover:bg-gray-200 p-4 rounded-lg shadow transition duration-200`}
                      >
                        <div className='flex justify-between items-center'>
                          <div>
                            <p className='text-gray-800'>
                              {notification.message}
                            </p>
                            <span className='text-sm text-gray-500'>
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleReadStatusChange(
                                notification.id,
                                notification.read
                              )
                            }
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              !notification.read
                                ? 'bg-blue-500 text-white'
                                : 'bg-green-500 text-white'
                            }`}
                          >
                            {!notification.read
                              ? 'Mark as Read'
                              : 'Mark as Unread'}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className='flex flex-col items-center justify-center h-full p-8'>
                    <IoIosNotificationsOff size={70} color='#111827' />
                    <p className='text-center text-lg font-medium text-gray-900 mt-2'>
                      You have no notifications.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </motion.div>

      {/* {mobile view} */}
      <div className='lg:hidden bg-white overflow-y-scroll fixed inset-0 z-30 transition-all duration-500'>
        <div className='flex items-center justify-between p-3 border-b'>
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
            <p className='text-lg'>Notifications</p>
          </div>
          <IoMdSearch
            size={25}
            className='transition ease-out hover:scale-90 duration-300'
          />
        </div>
        <hr />
        <div className='p-4'>
          {isLoading ? (
            <p className='text-center text-lg'>Loading notifications...</p>
          ) : notifications.length > 0 ? (
            <ul className='space-y-3'>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`${
                    !notification.read ? 'bg-gray-100' : 'bg-gray-300'
                  } hover:bg-gray-200 p-4 rounded-lg shadow transition duration-200`}
                >
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='text-gray-800'>{notification.message}</p>
                      <span className='text-sm text-gray-500'>
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleReadStatusChange(
                          notification.id,
                          notification.read
                        )
                      }
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        !notification.read
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {!notification.read ? 'Mark as Read' : 'Mark as Unread'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex flex-col items-center justify-center p-8'>
              <IoIosNotificationsOff size={70} color='#111827' />
              <p className='text-center text-lg font-medium text-gray-900 mt-2'>
                You have no notifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;

/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShop } from 'react-icons/fa6';
import { MdLocationPin } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';
import { Icons } from '../../data/listings'; // Adjust the import path
import { MdSupportAgent } from 'react-icons/md';
import Appicon from '../../assets/app-icon.png';

import Button from '../reusable/Button';
import profile from '../../assets/profile.svg';
import { ListingsContext } from '../../context/ListingsContext';
import { AuthContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';
import { showServicesAndUsers } from '../../services/RequestService';
import MobileCategories from '../modals/MobileCategories';
import { MdMediation } from 'react-icons/md';

function NavContent() {
  const [showCategories, setShowCategories] = useState(false);
  const [services, setServices] = useState([]);
  const { showCategory } = useContext(ListingsContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { handleNotificationToggle, handleLocationToggle, notifications } =
    useContext(ModalContext);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  const location = useLocation(); // Get the current route

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await showServicesAndUsers();
        setServices(response);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.read
    );
    setUnreadNotificationsCount(unreadNotifications.length);
  }, [notifications]);

  function handleCategories() {
    setShowCategories((prev) => {
      document
        .getElementsByTagName('html')[0]
        .classList.toggle('overflow-y-hidden', !prev);
      return !prev;
    });
  }

  function handleSelection(e) {
    const category = e.target.id || e.target.parentNode.id;
    showCategory(category);
  }

  function handleOpenNotifications() {
    handleNotificationToggle();
  }

  // Function to check if the link is active based on the current URL
  const isActiveRoute = (path) => location.pathname === path;

  return (
    <div>
      <div className='hidden lg:block'>
        {isAuthenticated && (
          <div className=''>{/* Additional content if authenticated */}</div>
        )}
        <div className='relative'>
          <Link to='/listings'>
            <div
              onClick={handleSelection}
              id='Browse All'
              className={`flex items-center gap-2 mb-2 p-1 text-sm cursor-pointer transition ease-in-out hover:bg-[#e4e6eb] rounded-md ${
                isActiveRoute('/listings') ? 'bg-[#e8d7ee] text-[#720d96]' : ''
              }`}
            >
              <div className='rounded-full p-2'>
                <FaShop size={24} />
              </div>
              <span>Browse All</span>
            </div>
          </Link>
          <Link to='/listing/op'>
            <div
              onClick={handleSelection}
              id='Opportunities' // Updated the ID to match the link
              className={`flex items-center gap-2 mb-2 p-1 text-sm cursor-pointer transition ease-in-out hover:bg-[#e4e6eb] rounded-md ${
                isActiveRoute('/listing/op') // Check against the correct path
                  ? 'bg-[#e8d7ee] text-[#720d96]'
                  : ''
              }`}
            >
              <div className='rounded-full p-2'>
                <MdMediation size={24} />
              </div>
              <span>Opportunities</span>
            </div>
          </Link>
          {isAuthenticated && (
            <>
              <div
                onClick={handleOpenNotifications}
                className={`flex items-center gap-2 mb-2 p-1 text-sm cursor-pointer transition ease-in-out hover:bg-[#e4e6eb] rounded-md relative`}
              >
                <div className='rounded-full p-2 w-fit'>
                  <IoNotifications size={24} />
                  {unreadNotificationsCount > 0 && (
                    <span className='absolute top-0 right-0 flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold ring-2 ring-white shadow-sm shadow-black'>
                      {unreadNotificationsCount}
                    </span>
                  )}
                </div>
                <span>Notifications</span>
              </div>
              <Link to='/support'>
                <div
                  onClick={handleSelection}
                  id='support'
                  className={`flex items-center gap-2 mb-2 p-1 text-sm cursor-pointer transition ease-in-out hover:bg-[#e4e6eb] rounded-md ${
                    isActiveRoute('/support')
                      ? 'bg-[#e8d7ee] text-[#720d96]'
                      : ''
                  }`}
                >
                  <div className='rounded-full p-2'>
                    <MdSupportAgent size={24} />
                  </div>
                  <span>Support</span>
                </div>
              </Link>
            </>
          )}
          <hr className='my-3' />

          {isAuthenticated && (
            <>
              <h1 className='font-semibold text-lg'>Categories</h1>
              <Link to='/listings'>
                <div className='py-3'>
                  {services.map((service) => {
                    const IconComponent = Icons.find(
                      (icon) => icon.category === service.title
                    )?.Icon;

                    return (
                      <div
                        key={service.id}
                        id={service.title}
                        onClick={handleSelection}
                        className={`flex items-center gap-2 mb-2 p-1 text-sm cursor-pointer transition ease-in-out hover:bg-[#e4e6eb] rounded-md ${
                          isActiveRoute(`/listings/${service.title}`)
                            ? 'bg-[#e8d7ee] text-[#720d96]'
                            : ''
                        }`}
                      >
                        <div className='rounded-full p-2'>
                          {IconComponent && <IconComponent size={24} />}
                        </div>
                        <span id={service.title}>{service.title}</span>
                      </div>
                    );
                  })}
                </div>
              </Link>
            </>
          )}

          <div className='relative bottom-0'>
            <div className='flex justify-center'>
              <a href='http://akbarirazia.vercel.app'>
                <img src={Appicon} alt='' className='w-14' />
              </a>
            </div>
            <div className='flex justify-center'>
              <small className=' text-[#720d96] text-center mt-4'>
                Beta version – expect some bugs. Thank you for your patience!
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile screen */}
      <div className='lg:hidden'>
        <div className='flex items-center justify-between text-[13px] sm:text-sm my-2'>
          <div className='flex items-center gap-2 font-medium'>
            <Link to={'/selling'}>
              <img
                src={profile}
                alt=''
                className='cursor-pointer w-8 sm:w-10'
              />
            </Link>
            <p
              onClick={handleCategories}
              className='p-2 sm:py-2 sm:px-3 rounded-3xl bg-[#e4e6eb]'
            >
              Categories
            </p>
            {isAuthenticated && (
              <p
                onClick={handleOpenNotifications}
                className='p-2 sm:py-2 sm:px-3 rounded-3xl bg-[#e4e6eb] relative'
              >
                Notifications
                {unreadNotificationsCount > 0 && (
                  <span className='absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-600' />
                )}
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className='mt-2 flex items-center justify-between text-sm'>
          {/* {currentCategory !== 'Browse All' && (
            <div className='flex items-center gap-2 py-1 px-3 w-fit border border-[#720D96] rounded-2xl'>
              <p>{currentCategory}</p>
              <div
                onClick={() => {
                  showCategory('Browse All');
                  setCurrentCategory('Browse All');
                }}
              >
                <IoMdClose size={15} />
              </div>
            </div>
          )} */}
          <div
            className='flex items-center gap-1 cursor-pointer float-right text-[13px] sm:text-sm'
            onClick={handleLocationToggle}
          >
            <MdLocationPin size={15} />
            <span className='hover:underline text-[#720D96]'>Location</span>
          </div>
        </div>
      </div>
      {showCategories && (
        <Link to='/listings'>
          <MobileCategories
            services={services}
            currentCategory={location.pathname}
            onClose={handleCategories}
            setCurrentCategory={() => {}}
          />
        </Link>
      )}
    </div>
  );
}

export default NavContent;

// export default NavContent;

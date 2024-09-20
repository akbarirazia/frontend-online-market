/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShop } from 'react-icons/fa6';
import { MdLocationPin } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';
import { Icons } from '../../data/listings'; // Adjust the import path

import Button from '../reusable/Button';
import profile from '../../assets/profile.svg';
import { ListingsContext } from '../../context/ListingsContext';
import { AuthContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';
import { showServicesAndUsers } from '../../services/RequestService';
import MobileCategories from '../modals/MobileCategories';

function NavContent() {
  const [showCategories, setShowCategories] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Browse All');
  const { showCategory } = useContext(ListingsContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { handleNotificationToggle, handleLocationToggle } =
    useContext(ModalContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await showServicesAndUsers(); // Adjust the endpoint as needed
        // console.log(response);
        setServices(response); // Assuming response.data is an array of services
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  function handleCategories() {
    setShowCategories((prev) => {
      document
        .getElementsByTagName('html')[0]
        .classList.toggle('overflow-y-hidden', !prev);
      return !prev;
    });
  }

  //   function handleSelection(e) {
  //     const category = e.target.id;
  //     console.log(category, 'value');
  //     showCategory(category);
  //     setCurrentCategory(category);
  //   }
  function handleSelection(e) {
    const category = e.target.id;
    showCategory(category); // Call the function to filter profiles
    setCurrentCategory(category);
  }

  return (
    <div>
      <div className='hidden lg:block'>
        {isAuthenticated && (
          <div className='mb-5'>
            <Link to={'/create'}>
              <Button className='p-4 rounded-md w-full bg-[#e8d7ee] text-[#720D96] font-semibold transition ease-in-out hover:text-white hover:bg-[#720D96]'>
                + Create a New Listing
              </Button>
            </Link>
          </div>
        )}
        <div className='pt-5'>
          <div
            onClick={handleSelection}
            id='Browse All'
            className={`flex items-center gap-2 mb-2 p-1 text-sm cursor-pointer transition ease-in-out hover:bg-[#e4e6eb] rounded-md ${
              currentCategory === 'Browse All'
                ? 'bg-[#e8d7ee] text-[#720d96]'
                : ''
            }`}
          >
            <div className='rounded-full p-2'>
              <FaShop size={24} />
            </div>
            <span>Browse All</span>
          </div>
          {isAuthenticated && (
            <div
              onClick={handleNotificationToggle}
              className={`flex items-center gap-2 mb-2 p-1 text-sm cursor-pointer transition ease-in-out hover:bg-[#e4e6eb] rounded-md`}
            >
              <div className='rounded-full p-2 w-fit'>
                <IoNotifications size={24} />
              </div>
              <span>Notifications</span>
            </div>
          )}
          <hr className='my-3' />
          <h1 className='font-semibold text-lg'>Categories</h1>
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
                    currentCategory === service.title
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
            <p className='p-2 sm:py-2 sm:px-3 rounded-3xl bg-[#e4e6eb]'>
              Inbox
            </p>
            <Link
              to={'/create'}
              className='p-2 sm:py-2 sm:px-3 rounded-3xl bg-[#e4e6eb]'
            >
              Sell
            </Link>
            <p
              onClick={handleCategories}
              className='p-2 sm:py-2 sm:px-3 rounded-3xl bg-[#e4e6eb]'
            >
              Categories
            </p>
            {isAuthenticated && (
              <p
                onClick={handleNotificationToggle}
                className='p-2 sm:py-2 sm:px-3 rounded-3xl bg-[#e4e6eb]'
              >
                Notifications
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className='mt-2 flex items-center justify-between text-sm'>
          {currentCategory !== 'Browse All' && (
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
          )}
          <div
            className='flex items-center gap-1 cursor-pointer float-right text-[13px] sm:text-sm'
            onClick={handleLocationToggle}
          >
            <MdLocationPin size={15} />
            <span className='hover:underline text-[#720D96]'>
              {/* Lagos, Nigeria */}
            </span>
          </div>
        </div>
      </div>
      {/* Uncomment if needed */}
      {showCategories && (
        <MobileCategories
          services={services}
          currentCategory={currentCategory}
          onClose={handleCategories}
          setCurrentCategory={setCurrentCategory}
        />
      )}
    </div>
  );
}

export default NavContent;

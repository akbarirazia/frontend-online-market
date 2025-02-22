import React, { useContext, useEffect, useState } from 'react';
import Button from '../reusable/Button';
import { FaHeart } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { AuthContext } from '../../context/AuthContext';
import imagePlaceholder from '../../assets/app-icon.png'; // Placeholder if image is unavailable
import { getSingleProfile } from '../../services/AllProfiles';
import RequestServiceModal from '../modals/RequestService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are imported

function ListingInfo({ listingId }) {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // New state for "like" functionality

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle like button
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Like removed!' : 'Profile liked!');
  };

  // Handle share button
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getSingleProfile(listingId);
        setUser(data);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [listingId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='flex flex-col sm:w-[30%] w-full md:py-1'>
      {/* User Profile Section */}
      <div className=' p-3'>
        <div className='flex flex-col items-center'>
          <img
            src={user.profilePicture || imagePlaceholder}
            alt={user.name}
            className='w-40 h-40 rounded-full object-cover'
          />
          <h2 className='mt-4 text-2xl font-bold'>{user.name}</h2>
          <p className='text-lg text-gray-600'>
            {user.headline || 'No headline available'}
          </p>
          <p className='text-md text-gray-500 mt-2'>
            {user.role === 'serviceSeeker'
              ? 'Looking for services'
              : 'Offering services'}
          </p>
          {user.rate && (
            <p className='text-lg font-semibold text-[#720D96] mt-4'>
              Hourly Rate: ${user.rate}/hr
            </p>
          )}
        </div>
        <div className='flex gap-4 justify-center mt-6'>
          {isAuthenticated && (
            <Button
              className={`border border-[#720D96] px-6 py-2 rounded-md bg-white hover:bg-[#720D96] hover:text-white ${
                user.id === userData.id ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                if (user.id === userData.id) {
                  return; // Prevent the modal from opening if IDs match
                }
                handleModalOpen(); // Open the modal only if IDs do not match
              }}
              disabled={user.id === userData.id} // Disable if IDs match
            >
              Request Service
            </Button>
          )}
          {isModalOpen && (
            <RequestServiceModal onClose={handleModalClose} id={listingId} />
          )}
        </div>
      </div>

      {/* User Bio and Actions */}
      <div className=' p-5 m '>
        <div className='mb-5'>
          <h3 className='text-xl font-semibold'>Bio</h3>
          {user.bio ? (
            <>
              <p className='text-md mt-2'>
                {showFullBio ? user.bio : `${user.bio.substring(0, 100)}...`}
                {user.bio.length > 100 && (
                  <span
                    className='text-[#720D96] cursor-pointer ml-2'
                    onClick={() => setShowFullBio(!showFullBio)}
                  >
                    {showFullBio ? 'Show less' : 'Read more'}
                  </span>
                )}
              </p>
            </>
          ) : (
            <p className='text-gray-500'>No bio available</p>
          )}
          <h3 className='text-xl font-semibold'> User Email Address:</h3>
          {user.email ? (
            <p className='text-md mt-2'>
              <span className='text-[#720D96] cursor-pointer '>
                {user.email}
              </span>
            </p>
          ) : (
            <p className='text-gray-500'>No email available</p>
          )}
        </div>
        <div className='flex gap-4 justify-center '>
          {/* Like Button */}
          <Button
            className={` border border-[#720D96] p-4 rounded-full hover:bg-[#720D96] hover:text-white ${
              isLiked ? 'bg-[#720D96] text-white' : ''
            }`}
            onClick={handleLike}
          >
            <FaHeart size={20} />
          </Button>
          {/* Share Button */}
          <Button
            className='bg-white border border-[#720D96] p-4 rounded-full hover:bg-[#720D96] hover:text-white'
            onClick={handleShare}
          >
            <IoIosShareAlt size={20} />
          </Button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ListingInfo;

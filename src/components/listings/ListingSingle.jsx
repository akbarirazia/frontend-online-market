/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import profile from '../../assets/profile.png';

import ImageLoader from '../reusable/ImageLoader';
import { ModalContext } from '../../context/ModalContext';

function ListingSingle({
  title,
  headline,
  location,
  img,
  id,
  isSellerListings,
  setListingId,
  rate,
  bio,
}) {
  const [liked, setLiked] = React.useState(false);
  const [likedPosts, setLikedPosts] = React.useState([]);
  const { handleDeleteListingsToggle } = React.useContext(ModalContext);
  console.log(img);

  function deleteListing() {
    handleDeleteListingsToggle();
    setListingId(id);
  }

  return (
    <div className='relative lg:border rounded-md text-lg mb-2 lg:p-2 transition ease-in-out hover:scale-105 duration-300 hover:shadow'>
      <Link
        to={`/listing/${id}`}
        className='cursor-pointer h-full flex flex-col justify-between'
        onClick={() => window.scrollTo(0, 0)}
      >
        {/* Image Section */}
        {/* {img ? (
          <LazyLoadImage
            src={img} // Render `img` if it's provided and valid
            alt='Listing Image'
            effect='blur'
            className='w-full lg:rounded-md aspect-[4/4] object-cover'
            wrapperProps={{
              style: { transitionDelay: '1s' },
            }}
          />
        ) : (
          <LazyLoadImage
            src={profile} // Render `profile` if `img` is not provided or invalid
            alt='Profile Image'
            effect='blur'
            className='w-full lg:rounded-md aspect-[4/4] object-cover'
            wrapperProps={{
              style: { transitionDelay: '1s' },
            }}
          />
        )} */}

        <LazyLoadImage
          src={img && img.trim() !== '' ? img : profile} // Better validation for img
          alt={img && img.trim() !== '' ? 'Listing Image' : 'Profile Image'}
          effect='blur'
          className='w-full lg:rounded-md aspect-[4/4] object-cover'
          wrapperProps={{
            style: { transitionDelay: '1s' },
          }}
        />

        {/* Content Section */}
        <div className='flex flex-col justify-between p-2'>
          <div className='text-sm lg:text-base'>
            <p className='font-medium text-lg'>{title}</p>
            <h1 className='font-semibold text-xl text-[#720D96]'>{headline}</h1>
            <p>{location}</p>

            {/* Status Section: Rate or Bio */}
            <div className='mt-2'>
              <p className='text-[#ac37d7]  text-sm'>
                <span className='text-[#000] font-semibold'>Rate:</span> ${rate}{' '}
                per hour
              </p>

              {/* <p className='text-sm text-gray-600 italic'>
                  {bio ? `"${bio.substring(0, 60)}..."` : 'No bio available'}
                </p> */}
            </div>
          </div>
        </div>
      </Link>

      {/* Conditional Heart or Delete Button */}
      {/* {!isSellerListings ? (
        <div className='absolute top-2 right-2' onClick={(e) => handleLike(e)}>
          {!liked ? (
            <FaRegHeart
              id={id}
              className='hover:fill-[#720D96]'
              cursor={'pointer'}
            />
          ) : (
            <FaHeart id={id} color='#720D96' cursor={'pointer'} />
          )}
        </div>
      ) : (
        <div className='absolute top-2 right-2' onClick={deleteListing}>
          <RiDeleteBin6Line
            color='red'
            className='hover:scale-125 '
            cursor={'pointer'}
            size={`${window.innerWidth < 640 ? 25 : 20}`}
          />
        </div>
      )} */}
    </div>
  );
}

ListingSingle.propTypes = {
  title: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isSellerListings: PropTypes.bool,
  setListingId: PropTypes.func,
  rate: PropTypes.number, // Optional if provided
  bio: PropTypes.string, // Optional if provided
};

export default ListingSingle;

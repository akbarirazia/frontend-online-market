import React from 'react';
import { mediaPosts } from '../../data/mockData'; // Importing mock data

function MediaGrid() {
  return (
    <div className='min-h-screen bg-gray-100 py-10 px-5'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-primary'>Media Listings</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {mediaPosts.map((post) => (
            <div
              key={post.id}
              className='bg-white shadow-lg rounded-lg overflow-hidden'
            >
              <img
                src={post.image}
                alt={post.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-5'>
                <div className='flex items-center mb-4'>
                  <img
                    src={post.user.profilePicture}
                    alt={post.user.name}
                    className='w-10 h-10 rounded-full mr-3'
                  />
                  <div>
                    <h3 className='text-lg font-semibold'>{post.user.name}</h3>
                  </div>
                </div>
                <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
                <p className='text-gray-700 mb-4'>{post.description}</p>
                <div className='flex justify-between items-center text-gray-600'>
                  <div className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-red-500 mr-1'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 15l7-7 7 7'
                      />
                    </svg>
                    {post.likes} Likes
                  </div>
                  <div>{post.comments} Comments</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MediaGrid;

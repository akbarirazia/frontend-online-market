import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoSearch } from 'react-icons/io5';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

import FormInput from './FormInput';
import Button from './reusable/Button';
import { fetchUsersByQuery } from '../services/Search';
import { Link } from 'react-router-dom';

function SearchInput({ setIsSearchInProgress, isSearchInProgress }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  //   const history = useHistory(); // Initialize useHistory for navigation

  useEffect(() => {
    const searchUser = async () => {
      if (query) {
        try {
          const response = await fetchUsersByQuery(query);
          setSearchResults(response.data);
          console.log(searchResults.data);
          // Update state with fetched users
        } catch (e) {
          console.error('Error:', e);
        }
      } else {
        setSearchResults([]); // Clear results when query is empty
      }
    };
    searchUser();
  }, [query]);

  function clearSearchInput() {
    setQuery('');
    setSearchResults([]); // Clear search results when input is cleared
  }

  return (
    <div className='relative md:w-[30%]'>
      <AnimatePresence mode='wait'>
        {isSearchInProgress ? (
          <motion.div
            key='search-in-progress'
            initial={{ opacity: 0, translateX: '100%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '100%' }}
            transition={{ duration: 0.3 }}
            className='flex items-center justify-between border-2 border-[#720D96] py-1 pl-5 pr-2 w-full max-w-md rounded-3xl'
          >
            <FormInput
              inputName='search'
              inputGroupClassNames='w-full'
              placeholderText='Search for items...'
              inputValue={query}
              inputId='search'
              ariaLabelName='search bar'
              onChange={(e) => setQuery(e.target.value)}
              className='border-r border-white mb-0 bg-transparent border-0 focus:border-0 focus:outline-none w-full flex-1'
            />
            <div className='bg-[#720D96] p-2 rounded-full cursor-pointer'>
              <IoClose
                size={20}
                onClick={() => {
                  setIsSearchInProgress(false);
                  clearSearchInput();
                }}
                color='white'
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='search-bar'
            initial={{ opacity: 0, translateX: '100%' }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: '100%' }}
            transition={{ duration: 0.3 }}
            className='md:flex items-center justify-between md:border-2 border-[#720D96] py-1 pl-5 pr-2 md:w-full max-w-md rounded-3xl'
          >
            <FormInput
              inputName='search'
              inputGroupClassNames='hidden md:block w-full'
              placeholderText='Search for items...'
              inputValue={query}
              inputId='search'
              ariaLabelName='search bar'
              onChange={(e) => setQuery(e.target.value)}
              className='border-r border-white mb-0 bg-transparent border-0 focus:border-0 focus:outline-none w-full flex-1'
            />
            {query && (
              <Button
                onClick={clearSearchInput}
                className='bg-gray-100 rounded-full cursor-pointer p-1 mr-3 hover:scale-105'
              >
                <IoClose />
              </Button>
            )}
            <div className='bg-[#e4e6eb] md:bg-[#720D96] hover:scale-105 p-2 rounded-full cursor-pointer'>
              <IoSearch
                size={20}
                color='white'
                onClick={() => setIsSearchInProgress(true)}
                className='hidden md:block'
              />
              <IoSearch
                onClick={() => {
                  setIsSearchInProgress(true);
                }}
                size={20}
                className='md:hidden hover:scale-105'
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render search results */}
      {searchResults.length > 0 && (
        <div className='absolute z-10  w-full bg-white border rounded-md shadow'>
          <ul className='list-none z-50'>
            {searchResults.map((user) => (
              <Link to={`/listing/${user.id}`}>
                {' '}
                <li
                  key={user.id} // Use the user ID as the key
                  onClick={() => {}}
                  className='p-2 cursor-pointer transition ease-in-out hover:bg-[#f0f0f0] duration-300'
                >
                  {user.name} - {user.headline}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  isSearchInProgress: PropTypes.bool,
  setIsSearchInProgress: PropTypes.func,
};

SearchInput.defaultProps = {
  isSearchInProgress: false,
  setIsSearchInProgress: () => {}, // Provide a default no-op function
};

export default SearchInput;

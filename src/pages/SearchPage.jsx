import React, { useState, useEffect } from 'react';
import { ListingsProvider } from '../context/ListingsContext';
import ListingsGrid from '../components/listings/ListingsGrid';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import SearchInput from '../components/SearchInput';
import { fetchUsersByQuery } from '../services/Search';

function SearchPage() {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Capture search input
  const [listings, setListings] = useState([]); // Store listings
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch listings when the component mounts or search term changes
  useEffect(() => {
    const fetchListings = async () => {
      if (!searchTerm) return; // Don't fetch if search term is empty

      setLoading(true);
      setError(null);

      try {
        const data = await fetchUsersByQuery(searchTerm); // Call API to get filtered results
        setListings(data); // Set the fetched listings
      } catch (err) {
        setError('Error fetching listings, please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchTerm]); // Trigger when searchTerm changes

  return (
    <div>
      <ListingsProvider>
        <div className='flex items-center justify-between p-3 border-b'>
          <Link
            to={'/listings'}
            className='flex items-center gap-2 cursor-pointer'
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
          >
            <IoMdArrowBack
              size={20}
              className={`${
                mouseEnter ? 'transition ease-in-out w-8 duration-500' : ''
              }`}
            />
            <p className='text-sm'>Search Marketplace</p>
          </Link>
        </div>
        <hr />

        {/* Search Input */}
        {/* <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
          placeholder='Search by name or headline...'
        /> */}

        {/* Display error */}
        {error && <div className='text-red-500'>{error}</div>}

        {/* Display loading indicator */}
        {loading ? (
          <div className='text-center'>Loading...</div>
        ) : (
          <ListingsGrid listings={listings} /> // Pass the filtered listings to ListingsGrid
        )}
      </ListingsProvider>
    </div>
  );
}

export default SearchPage;

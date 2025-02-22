import React from 'react';
import { useParams } from 'react-router-dom';
import ListingGallery from '../components/listings/ListingGallery';
import Container from '../components/container/Container';
import ListingInfo from '../components/listings/ListingInfo';
import ListingHeader from '../components/listings/ListingHeader';
import { SingleListingProvider } from '../context/SingleListingContext';

function SingleListing() {
  // Step 1: Extract the id from the route
  const { id } = useParams();
  console.log(id);

  return (
    <Container className=''>
      <SingleListingProvider>
        {/* Step 2: Pass the id as a prop to any child component */}
        <ListingHeader listingId={id} />
        <div className='flex w-full justify-center flex-col md:flex-row md:py-8'>
          <ListingInfo listingId={id} className='order-1 md:order-1' />{' '}
          {/* Render first in mobile view */}
          <ListingGallery listingId={id} className='order-2 md:order-2' />{' '}
          {/* Render second in mobile view */}
        </div>
      </SingleListingProvider>
    </Container>
  );
}

export default SingleListing;

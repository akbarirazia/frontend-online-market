import React from 'react';
import NavContent from '../components/navBar/NavContent';
import NavContainer from '../components/navBar/NavContainer';
import PageLayout from '../components/shared/Layouts/PageLayout';
import ListingsGrid from '../components/listings/ListingsGrid';
import MediaGrid from '../components/media/MediaGrid';
import OpportunityGrid from '../components/media/MediaGrid';

function Media() {
  return (
    <PageLayout pageName={'media'}>
      <OpportunityGrid />
    </PageLayout>
  );
}

export default Media;

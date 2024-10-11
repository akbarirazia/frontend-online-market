import React from 'react';

import PageLayout from '../components/shared/Layouts/PageLayout';
import RequestGrid from '../components/RequestGrid';

function ServiceRequest() {
  return (
    <PageLayout pageName={'requests'}>
      <RequestGrid />
    </PageLayout>
  );
}

export default ServiceRequest;

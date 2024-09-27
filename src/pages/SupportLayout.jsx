import React from 'react';
import NavContent from '../components/navBar/NavContent';
import NavContainer from '../components/navBar/NavContainer';

import PageLayout from '../components/shared/Layouts/PageLayout';
import SupportForm from '../components/forms/SupportForm';

function SupportLayout() {
  return (
    <PageLayout pageName={'support'}>
      <SupportForm />
    </PageLayout>
  );
}

export default SupportLayout;

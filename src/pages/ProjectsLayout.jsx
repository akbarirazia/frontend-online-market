// import React from "react";
import PersonalPageLayout from '../components/shared/Layouts/PersonalPageLayout';
import MainPage from '../components/UserListings/MainPage';

function ProjectsLayout() {
  return (
    <div>
      <PersonalPageLayout pageName={'projects'}>
        <MainPage pageName={'projects'} />
      </PersonalPageLayout>
    </div>
  );
}

export default ProjectsLayout;

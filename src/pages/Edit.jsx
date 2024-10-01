import React from 'react';
import { useLocation } from 'react-router-dom';
import PostPreview from '../components/PostPreview';
import CreateListing from './CreateListing';

function Edit() {
  const location = useLocation();
  const project = location.state?.project || {}; // Fallback to empty object if no project is passed
  console.log(project);

  return (
    <div>
      <h1>Edit Project</h1>
      <CreateListing
        images={''} // Use project images if available
        Data={{
          title: project.title || '',
          link: project.link || '',
          description: project.description || '',
        }}
        activeInput=''
      />
    </div>
  );
}

export default Edit;

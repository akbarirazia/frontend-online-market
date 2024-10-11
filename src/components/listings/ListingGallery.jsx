import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-medium-image-zoom/dist/styles.css';
import { ProjectService } from '../../services/ProjectRoutes'; // Adjust the import as needed

function ListingGallery({ listingId }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectService.getProjects(listingId); // Assuming listingId is userId
        setProjects(data);
        if (data.length > 0) {
          setCurrentProject(data[0]); // Set the first project as the current project
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [listingId]);

  const handleImageClick = (imageUrl) => {
    setExpandedImage(imageUrl);
  };

  const handleClose = () => {
    setExpandedImage(null);
    setZoom(1);
  };

  const handleSelection = (project) => {
    setCurrentProject(project);
  };

  const handleZoomIn = (event) => {
    event.stopPropagation();
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = (event) => {
    event.stopPropagation();
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  return (
    <div className='md:flex-1 2xl:flex-none 2xl:w-2/3'>
      <div className='w-full lg:w-[80%] 2xl:w-full 2xl:flex flex-row-reverse mx-auto py-5 px-2 md:py-0'>
        <div
          className='mb-5 w-full'
          onClick={() => handleImageClick(currentProject?.image_url)}
          id='main-image'
        >
          {currentProject && (
            <>
              <LazyLoadImage
                src={currentProject.image_url}
                alt={currentProject.title}
                effect='blur'
                wrapperProps={{
                  style: { transitionDelay: '1s' },
                }}
                className='rounded-3xl w-full max-h-[700px]'
              />
              <div className='mt-4'>
                <h2 className='text-xl font-semibold'>
                  {currentProject.title}
                </h2>
                <p className='text-gray-600'>{currentProject.description}</p>
                <a
                  href={currentProject.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline'
                >
                  View Project
                </a>
              </div>
            </>
          )}
        </div>
        <div className='grid grid-cols-3 gap-4 md:gap-8 w-full 2xl:flex flex-col 2xl:max-h-56 2xl:w-1/4'>
          {projects.map((project) => (
            <div key={project.id} onClick={() => handleSelection(project)}>
              <LazyLoadImage
                src={project.image_url}
                className='rounded-3xl w-full h-full cursor-pointer transition ease-in-out hover:opacity-90 duration-500 2xl:w-3/4 mx-auto'
                alt={project.title}
                onCLick={() => handleSelection(project)}
                wrapperProps={{
                  style: { transitionDelay: '1s' },
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {expandedImage && (
        <div className='overlay' onClick={handleClose}>
          <div className='image-container' onClick={(e) => e.stopPropagation()}>
            <img
              src={expandedImage}
              alt='Selected'
              loading='lazy'
              className='full-screen-image'
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
          <div className='controls'>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingGallery;

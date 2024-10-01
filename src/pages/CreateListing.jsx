import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom'; // useParams to get project ID
import profile from '../assets/profile.svg';
import AddPhotos from '../components/AddPhotos';
import PostPreview from '../components/PostPreview';
import FormInput from '../components/FormInput';
import Button from '../components/reusable/Button';
import { AuthContext } from '../context/AuthContext';
import { ProjectService } from '../services/ProjectRoutes';

function CreateListing({ Data }) {
  const [mouseEnter, setMouseEnter] = React.useState(false);
  const [images, setImages] = React.useState([]); // Separate state for images
  const [formData, setFormData] = React.useState({
    title: Data?.title || '',
    description: Data?.description || '',
    link: Data?.link || '',
    image_url: Data?.image_url || '',
  });
  const [activeInput, setActiveInput] = React.useState('');
  const { userData } = useContext(AuthContext);
  const { projectId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the existing project data when editing
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [projectId]);

  const fetchProjectData = async (projectId) => {
    try {
      const response = await ProjectService.getProjectById(projectId);
      const projectData = response.data;

      // Set formData with the project data
      setFormData({
        title: projectData.title || '',
        description: projectData.description || '',
        link: projectData.link || '',
        image_url: projectData.image_url || '',
      });

      // Set images if there is an existing image
      if (projectData.image_url) {
        setImages([{ file: projectData.image_url }]);
      }
    } catch (err) {
      console.error('Error fetching project data:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImagesChange = (images) => {
    setImages(images);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('user_id', userData.id);

      if (images.length > 0) {
        formDataToSend.append('image_url', images[0].file); // Assuming images[0].file contains the image file
      }

      let response;
      if (projectId) {
        // If editing, update the project
        response = await ProjectService.updateProject(
          projectId,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('Project successfully updated');
        setTimeout(() => {
          navigate('/projects');
        }, [1500]);
      } else {
        // If creating a new project
        response = await ProjectService.createProject(formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Project successfully created');
      }

      console.log(response.data);
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Submission failed');
    }
  };

  return (
    <div className='flex h-screen text-[#141414]'>
      <div className='w-full lg:w-[30%] 2xl:w-[25%] h-screen overflow-y-scroll'>
        <div className='flex items-center justify-between p-3 border-b'>
          <Link
            to={'/userprofile'}
            className='flex items-center gap-2 cursor-pointer'
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
          >
            <IoMdArrowBack
              size={25}
              className={`${
                mouseEnter ? 'transition ease-in-out w-8 duration-500' : ''
              }`}
            />
            <p className='text-lg'>Marketplace</p>
          </Link>
          <Link to={'/userprofile'}>
            <img src={profile} alt='' className='hover:scale-110' />
          </Link>
        </div>
        <hr />
        <div className='p-4'>
          <form className='' onSubmit={handleSubmit}>
            <h2 className='font-bold text-2xl mb-3'>
              {projectId ? 'Edit your project' : 'Create your post'}
            </h2>
            <div>
              <p>
                <span>{`Photos · ${images.length}/1 -`}</span> You can add your
                photo here
              </p>
              <AddPhotos onImagesChange={handleImagesChange} />
            </div>
            <h3>Required</h3>
            <p>Be as descriptive as possible</p>
            <FormInput
              inputName='title'
              inputId='title'
              placeholderText='Title'
              inputValue={formData.title}
              onChange={handleChange}
              className='w-full p-4 border-2 my-3 border-[#D0D5DD] bg-white rounded-md shadow-sm transition ease-in-out hover:border-[#720D96] focus:outline-none focus:border-[#720D96] duration-300'
            />
            <FormInput
              inputName='link'
              inputId='link'
              placeholderText='Link'
              inputValue={formData.link}
              onChange={handleChange}
              className='w-full p-4 border-2 mb-3 border-[#D0D5DD] bg-white rounded-md shadow-sm transition ease-in-out hover:border-[#720D96] focus:outline-none focus:border-[#720D96] duration-300'
            />
            <textarea
              name='description'
              id='description'
              cols={50}
              rows={5}
              onChange={handleChange}
              className='border-2 border-[#ced0d4] shadow-sm w-full rounded-md resize-none p-2 focus:outline-[#720D96] hover:border-[#720D96] text-sm'
              value={formData.description}
              placeholder='Please type your message to the seller'
            ></textarea>
            <div className='flex items-center justify-end gap-5 pt-3'>
              <Button
                type='submit'
                className='border border-[#720D96] bg-white p-4 rounded-md font-medium transition ease-in-out hover:bg-[#720D96] hover:text-white duration-300'
              >
                {projectId ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className='hidden w-[70%] 2xl:w-[75%] h-screen lg:flex items-center justify-center bg-[#f0f2f5]'>
        <div className='md:w-[95%] 2xl:w-[70%] mx-auto'>
          <PostPreview images={images ? images : ''} formData={formData} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateListing;

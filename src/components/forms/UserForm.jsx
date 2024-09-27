import { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { updateProfile } from '../../services/AllProfiles'; // Adjust the import path as needed
import { FaCamera } from 'react-icons/fa';
import FormInput from '../FormInput';
import { AuthContext } from '../../context/AuthContext';

function UserForm({ formData, handleChange, saveChanges }) {
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image

  const handleLocalChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profilePicture') {
      const file = files[0];
      handleChange(e); // Propagate the change to parent state
      if (file) {
        setImagePreview(URL.createObjectURL(file)); // Set image preview
      }
    }
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Prepare FormData to send
  //     const updatedData = new FormData();

  //     // Append form fields to FormData
  //     updatedData.append('name', formData.name);
  //     updatedData.append('headline', formData.headline);
  //     updatedData.append('bio', formData.bio);
  //     updatedData.append('rate', formData.rate);

  //     // Append file if available
  //     if (formData.profilePicture instanceof File) {
  //       updatedData.append('profilePicture', formData.profilePicture);
  //     }
  //     console.log(updatedData);

  //     // Call the updateProfile function with the updatedData
  //     await updateProfile(formData.id, updatedData); // Assuming updateProfile accepts FormData directly
  //     toast.success('Profile updated successfully');
  //     saveChanges();
  //   } catch (error) {
  //     toast.error('Failed to update profile');
  //     console.error('Error updating profile:', error);
  //   }
  // };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Log formData to inspect the current values
      console.log('formData before sending:', formData);

      const updatedData = new FormData();
      updatedData.append('name', formData.name);
      updatedData.append('headline', formData.headline);
      updatedData.append('bio', formData.bio);
      updatedData.append('rate', formData.rate);
      console.log('sending', formData.rate);

      if (formData.profilePicture instanceof File) {
        updatedData.append('profilePicture', formData.profilePicture);
      }

      await updateProfile(formData.id, updatedData);
      toast.success('Profile updated successfully');
      saveChanges();
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className='relative h-64 w-full bg-top bg-cover bg-no-repeat'>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt='Profile Preview'
            className='absolute bottom-0 left-3 w-40 border-4 border-white rounded-full'
          />
        ) : formData.profilePicture ? (
          // Use the URL directly if it exists
          <img
            src={
              typeof formData.profilePicture === 'string'
                ? formData.profilePicture
                : URL.createObjectURL(formData.profilePicture)
            }
            alt='Profile'
            className='absolute bottom-0 left-3 w-40 border-4 border-white rounded-full'
          />
        ) : (
          <img
            src='default-image-url' // Fallback image URL
            alt='Profile'
            className='absolute bottom-0 left-3 w-40 border-4 border-white rounded-full'
          />
        )}
        <div className='absolute bottom-3 right-3 bg-white rounded-full p-2 hover:scale-105 cursor-pointer'>
          <input
            type='file'
            name='profilePicture'
            accept='image/*'
            onChange={handleLocalChange}
            className='hidden'
            id='profilePicture'
          />
          <label htmlFor='profilePicture'>
            <FaCamera size={25} />
          </label>
        </div>
      </div>
      <div className='px-5 py-5'>
        <FormInput
          inputLabel='Your Name'
          labelFor='name'
          inputType='text'
          inputId='name'
          inputName='name'
          placeholderText={formData.name}
          ariaLabelName='Name'
          onChange={handleChange}
          value={formData.name}
          isRequired={false}
          labelClasses='text-base'
          className='sm:w-[40%] p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-[#720D96] hover:border-[#720D96] mt-2 mb-5'
        />
        <FormInput
          inputLabel='Headline'
          labelFor='headline'
          inputType='text'
          inputId='headline'
          inputName='headline'
          placeholderText={formData.headline}
          ariaLabelName='Headline'
          onChange={handleChange}
          value={formData.headline}
          className='sm:w-[40%] p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-[#720D96] hover:border-[#720D96] mt-2 mb-5'
        />
        <FormInput
          inputLabel='rate'
          labelFor='rate'
          inputType='number'
          inputId='rate'
          inputName='rate'
          placeholderText={formData.rate}
          ariaLabelName='rate'
          onChange={handleChange}
          value={formData.rate}
          className='sm:w-[40%] p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-[#720D96] hover:border-[#720D96] mt-2 mb-5'
        />
        <hr />
        <div className='pt-3 mb-5'>
          <h2>About</h2>
          <textarea
            name='bio'
            id='bio'
            cols={50}
            rows={5}
            onChange={handleChange}
            className='border border-[#D0D5DD] shadow-sm w-full rounded-md resize-none p-2 focus:outline-[#720D96] hover:border-[#720D96] mt-2'
            // value={formData.bio}
            placeholder='Write a summary about yourself'
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full md:text-base text-white font-medium px-6 py-4 rounded-md mt-5 bg-[#720D96]'
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default UserForm;

import { useContext, useEffect, useState } from 'react';
import Button from '../reusable/Button';
import { motion } from 'framer-motion';
import UserForm from '../forms/UserForm';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from '../../services/AllProfiles';
import { toast, ToastContainer } from 'react-toastify';
import {
  assignService,
  showServices,
  showUserService,
} from '../../services/RequestService';
import Modal from '../modals/Modal'; // Adjust the import according to your folder structure

function UserProfile() {
  const [isEditRequested, setIsEditRequested] = useState(false);
  const [isServiceEditRequested, setIsServiceEditRequested] = useState(false);
  const { isAuthenticated, userData, updateUser } = useContext(AuthContext);
  const [services, setServices] = useState(userData?.services || []);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    headline: userData?.headline || '',
    bio: userData?.bio || '',
    profilePicture: null,
    rate: userData?.rate || 0,
  });

  useEffect(() => {
    const fetchUserService = async () => {
      try {
        const response = await showUserService(userData.id);
        setServices(response.providedServices);
        setSelectedServices(
          response.providedServices.map((service) => service.id)
        );
      } catch (e) {
        console.error(e);
      }
    };

    const getAvailableServices = async () => {
      try {
        const response = await showServices();
        setAvailableServices(response);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserService();
    getAvailableServices();
  }, [userData.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePicture: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const saveChanges = async () => {
    try {
      const updatedData = new FormData();
      updatedData.append('name', formData.name);
      updatedData.append('headline', formData.headline);
      updatedData.append('bio', formData.bio);
      if (formData.profilePicture) {
        updatedData.append('profilePicture', formData.profilePicture);
      }
      updatedData.append('rate', formData.rate);

      const response = await updateProfile(userData.id, updatedData);
      updateUser(response);
      toast.success('Profile updated successfully');
      setIsEditRequested(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error saving changes:', error);
    }
  };

  const handleServiceCheck = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(serviceId)) {
        // If the service is already selected, remove it
        return prevSelectedServices.filter((id) => id !== serviceId);
      } else {
        // If the service is not selected, add it
        return [...prevSelectedServices, serviceId];
      }
    });
  };

  const saveServices = async () => {
    try {
      const data = {
        userId: userData.id,
        serviceIds: selectedServices,
      };
      const response = await assignService(data);
      const refetching = await showUserService(userData.id);
      setServices(refetching.providedServices);

      setIsServiceEditRequested(false);
      toast.success(response.message);
    } catch (error) {
      toast.error('Failed to update services');
      console.error('Error saving services:', error);
    }
  };

  return (
    <section>
      <header className='w-full flex justify-end p-2'>
        {!isEditRequested && (
          <Button
            onClick={() => setIsEditRequested(true)}
            className='md:text-base text-white font-medium px-6 py-4 rounded-md bg-[#720D96]'
          >
            Edit
          </Button>
        )}
        {isEditRequested && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'linear', duration: 0.6 }}
            className='flex align-center gap-3'
          >
            <Button
              onClick={saveChanges}
              className='md:text-base font-medium px-6 py-4 rounded-md bg-white text-[#141414] border border-[#720D96] hover:bg-[#720D96] hover:text-white'
            >
              Save
            </Button>
            <Button
              onClick={() => setIsEditRequested(false)}
              className='md:text-base font-medium px-6 py-4 rounded-md bg-white text-[#141414] border border-[#720D96] hover:bg-[#720D96] hover:text-white'
            >
              Close
            </Button>
          </motion.div>
        )}
      </header>

      {!isEditRequested && (
        <div className='bg-white  mx-auto'>
          <div className='relative'>
            <div className='relative h-64 w-full bg-center bg-cover bg-black'>
              <img
                src={userData.profilePicture}
                alt=''
                className='absolute bottom-0 left-3 w-40 border-4 border-white rounded-full'
              />
            </div>
            <div className='px-5 py-5'>
              <h1 className='text-2xl font-bold'>{userData.name}</h1>
              <p className='text-[#77797c] my-2'>
                Joined in {new Date(userData.createdAt).getFullYear()}
              </p>
              <p className='text-[#77797c] my-3'>{userData.headline}</p>
              <p className='text-lg font-semibold text-[#720D96] mt-4'>
                Hourly Rate: ${userData.rate}/hr
              </p>
              <hr />
              <div className='pt-3'>
                <h2>About</h2>
                <p>{userData.bio}</p>
              </div>

              <div className='mt-5'>
                <h2 className='text-lg font-semibold'>Services Provided</h2>
                <div className='flex flex-wrap gap-3 mt-3'>
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-center border-2 border-[#b03eda] rounded-lg py-2 px-4'
                      style={{
                        boxShadow: '0 0 3px rgba(114, 13, 150, 0.3)', // Neon glow effect
                      }}
                    >
                      <span className='text-[#b03eda] font-semibold text-base'>
                        {service.title}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setIsServiceEditRequested(true)}
                  className='mt-3 md:text-base text-white font-medium px-4 py-2 rounded-md bg-[#720D96]'
                >
                  Edit Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditRequested && (
        <UserForm
          formData={formData}
          handleChange={handleChange}
          saveChanges={saveChanges}
        />
      )}

      {/* Modal for Editing Services */}
      <Modal
        isOpen={isServiceEditRequested}
        onClose={() => setIsServiceEditRequested(false)}
      >
        <h2 className='text-xl font-semibold'>Edit Services</h2>
        <br />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {availableServices.map((service) => (
            <label key={service.id} className='flex items-center'>
              <input
                type='checkbox'
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceCheck(service.id)}
                className='mr-2'
              />
              {service.title}
            </label>
          ))}
        </div>
        <div className='flex gap-5 float-end'>
          <Button
            onClick={saveServices}
            className='mt-3 md:text-base text-white font-medium px-3 py-1 rounded-md bg-[#720D96]'
          >
            Save Services
          </Button>
          <Button
            onClick={() => setIsServiceEditRequested(false)}
            className='mt-3 md:text-base text-white font-medium px-3 py-1 rounded-md bg-red-500'
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <ToastContainer />
    </section>
  );
}

export default UserProfile;

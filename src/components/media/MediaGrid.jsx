import React, { useContext, useEffect, useState } from 'react';
import Button from '../reusable/Button';
import {
  fetchOpportunities,
  applyForOpportunity,
  postOpportunity,
} from '../../services/opportunities';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '../../components/modals/Modal';
import { Link } from 'react-router-dom';

function OpportunityGrid() {
  const [opportunities, setOpportunities] = useState([]);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    budget: '',
    location: '',
  });
  const { userData } = useContext(AuthContext);

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [coverletter, setCoverletter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Handle opening and closing modals
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenApplyModal = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsApplyModalOpen(true);
  };
  const handleCloseApplyModal = () => setIsApplyModalOpen(false);

  // Fetch opportunities
  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const response = await fetchOpportunities();
        setOpportunities(response);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };
    loadOpportunities();
  }, []);

  // Handle input change for posting new opportunities
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOpportunity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submitting new opportunity
  // Handle submitting new opportunity
  const handleSubmitOpportunity = async (e) => {
    e.preventDefault();
    try {
      const response = await postOpportunity(newOpportunity);
      toast.success('Opportunity posted successfully!');
      setIsModalOpen(false); // Close modal after successful submission

      // Re-fetch opportunities after posting the new one
      const updatedOpportunities = await fetchOpportunities();
      setOpportunities(updatedOpportunities); // Update the state with new opportunities
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg ||
        error.message ||
        'Something went wrong, please try again!';
      toast.error(errorMessage);
    }
  };

  // Handle applying for an opportunity
  const handleApply = async () => {
    if (!selectedOpportunity) return;

    try {
      setIsApplyModalOpen(false); // Close the apply modal
      setCoverletter('');

      const data = {
        opportunityId: selectedOpportunity.id,
        coverletter: coverletter,
      };

      await applyForOpportunity(data);
      setIsApplyModalOpen(false); // Close the apply modal
      setCoverletter(''); // Clear the cover letter
      toast.success('Application submitted successfully!');
    } catch (error) {
      // Improved error handling
      if (error.response && error.response.data && error.response.data.msg) {
        // Access the message from the server response
        toast.error(error.response.data.msg);
      } else {
        // Handle unexpected error formats
        toast.error('An unexpected error occurred. Please try again later.');
      }
      console.error('Error applying for opportunity:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-10 px-5'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold mb-4'>
            Available Opportunities
          </h2>
          <button
            className={`bg-[#720D96] text-white px-4 py-2 rounded transition 
              ${
                userData?.role === 'businessOwner'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-purple-950'
              }`}
            onClick={handleOpenModal}
            disabled={userData?.role === 'businessOwner'}
            title={
              userData?.role === 'businessOwner'
                ? 'Only service seekers can post an opportunity'
                : ''
            }
          >
            Post an Opportunity
          </button>
        </div>

        {/* Modal for posting a new opportunity */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className='text-xl font-bold mb-4'>Post an Opportunity</h2>
          <form onSubmit={handleSubmitOpportunity}>
            <div className='mb-4'>
              <label className='block text-sm font-medium'>Title</label>
              <input
                type='text'
                name='title'
                value={newOpportunity.title}
                onChange={handleInputChange}
                required
                className='w-full p-2 border rounded'
                placeholder='Enter opportunity title'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium'>Description</label>
              <textarea
                name='description'
                value={newOpportunity.description}
                onChange={handleInputChange}
                required
                className='w-full p-2 border rounded'
                placeholder='Enter opportunity description'
              ></textarea>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium'>Budget</label>
              <input
                type='text'
                name='budget'
                value={newOpportunity.budget}
                onChange={handleInputChange}
                required
                className='w-full p-2 border rounded'
                placeholder='Enter budget'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium'>Location</label>
              <input
                type='text'
                name='location'
                value={newOpportunity.location}
                onChange={handleInputChange}
                required
                className='w-full p-2 border rounded'
                placeholder='Enter location'
              />
            </div>
            <button
              type='submit'
              className='bg-[#720D96] text-white px-4 py-2 rounded hover:bg-purple-950 transition'
            >
              Submit
            </button>
          </form>
        </Modal>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className='bg-white shadow-lg rounded-lg overflow-hidden'
            >
              <div className='p-5'>
                <h3 className='text-xl font-bold mb-2'>{opportunity.title}</h3>
                <p className='text-gray-700 mb-4'>{opportunity.description}</p>
                <p className='text-gray-600'>Budget: ${opportunity.budget}</p>
                <p className='text-gray-600'>
                  Location: {opportunity.location}
                </p>
                <p className='text-gray-600'>
                  Posted by:{' '}
                  <Link
                    to={`/listing/${opportunity.serviceSeeker.id}`}
                    className='text-[#c341f3]'
                  >
                    {opportunity.serviceSeeker.name} -{' '}
                    {opportunity.serviceSeeker.headline}
                  </Link>
                </p>
                <Button
                  onClick={() => handleOpenApplyModal(opportunity)}
                  className='mt-4 bg-[#720D96] text-white p-2 rounded'
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for applying to an opportunity */}
        {selectedOpportunity && (
          <Modal isOpen={isApplyModalOpen} onClose={handleCloseApplyModal}>
            <h3 className='text-xl font-bold mb-2'>
              Apply for {selectedOpportunity.title}
            </h3>
            <p className='text-gray-700 mb-4'>
              {selectedOpportunity.description}
            </p>
            <textarea
              placeholder='Cover Letter'
              value={coverletter}
              onChange={(e) => setCoverletter(e.target.value)}
              className='border p-2 w-full mb-4'
            />
            <div className='flex justify-end'>
              <Button
                onClick={handleCloseApplyModal}
                className='bg-gray-500 text-white p-2 rounded mr-2'
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                className='bg-[#720D96] text-white p-2 rounded'
              >
                Submit Application
              </Button>
            </div>
          </Modal>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default OpportunityGrid;

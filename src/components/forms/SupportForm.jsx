import { useContext, useState } from 'react';
import FormInput from '../FormInput';
import Button from '../reusable/Button';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supportService } from '../../services/supportService';
import { AuthContext } from '../../context/AuthContext';

const SupportForm = () => {
  const { userData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: userData.id,
        subject: formData.subject,
        message: formData.message,
      };
      console.log(data);

      await supportService.sendSupportRequest(data);
      toast.success('Support request submitted successfully.');
      setFormData({ subject: '', message: '' });
    } catch (error) {
      toast.error('Error submitting support request; please try again later.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className='p-10 sm:px-28 sm:w-2/3 mx-auto my-0'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800 text-center'>
        Submit a Support Request
      </h2>
      <form onSubmit={handleSubmit} className='space-y-6  '>
        <FormInput
          inputLabel='Subject'
          labelFor='subject'
          inputType='text'
          inputId='subject'
          inputName='subject'
          placeholderText='Enter the subject of your support request'
          ariaLabelName='Subject'
          inputValue={formData.subject}
          onChange={handleChange}
          isRequired={true}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
        />
        <label htmlFor='message' className='font-medium'>
          Message <span className='text-red-700'>*</span>
        </label>
        <textarea
          inputLabel='Message'
          labelFor='message'
          inputType='textarea'
          inputId='message'
          inputName='message'
          placeholderText='Describe your issue or concern in detail'
          ariaLabelName='Message'
          inputValue={formData.message}
          onChange={handleChange}
          required={true}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          rows='6'
        />
        <Button className='w-full md:text-base text-white font-medium px-6 py-4 rounded-md bg-[#720D96]'>
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SupportForm;

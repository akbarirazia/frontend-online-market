import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../FormInput';
import Button from '../reusable/Button';
import { useNavigate } from 'react-router-dom';
import { resetPass } from '../../services/resetPass';

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: '' });
  const [isLoading, setIsLoading] = React.useState(false); // Add loading state

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function resetPassword(e) {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when request starts

    try {
      // Call the sendOtp function from resetPass
      const response = await resetPass.sendOtp(formData.email);
      toast.success('OTP sent successfully! Check your email.');
      navigate('/changepassword');
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false); // Always set loading state back to false when request is done
    }
  }

  return (
    <div>
      <form onSubmit={resetPassword}>
        <FormInput
          inputLabel='Email Address'
          labelFor='email'
          inputType='email' // Change to "email" for validation
          inputId='email'
          inputName='email'
          placeholderText='Enter your email address'
          ariaLabelName='Email'
          inputValue={formData.email}
          onChange={handleChange}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          required // Ensure this field is required
        />
        <Button
          className={`w-full md:text-base text-white font-medium px-6 py-4 rounded-md bg-[#720D96] `}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Sending...' : 'Send Email'}{' '}
          {/* Show loading text when waiting */}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPasswordForm;

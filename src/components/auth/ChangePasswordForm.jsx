import React from 'react';
import FormInput from '../FormInput';
import Button from '../reusable/Button';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { resetPass } from '../../services/resetPass';

function ChangePasswordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    code: '',
    password: '',
    repeatedPassword: '',
  });
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

    if (formData.password !== formData.repeatedPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true); // Set loading to true while waiting for backend response

    try {
      // Verify OTP
      const verifyResponse = await resetPass.verifyOtp(
        formData.code,
        formData.email
      );
      if (verifyResponse.verified === true) {
        // If OTP verification is successful, change the password
        const changeResponse = await resetPass.changePassword(
          formData.email,
          formData.password,
          verifyResponse.token
        );
        toast.success('Password changed successfully!');
        navigate('/signin'); // Redirect to login or desired page
      } else {
        toast.error('OTP verification failed. Please try again.');
      }
    } catch (error) {
      toast.error(
        error.message || 'Failed to change password. Please try again.'
      );
    } finally {
      setIsLoading(false); // Set loading back to false when done
    }
  }

  return (
    <div>
      <form onSubmit={resetPassword}>
        <FormInput
          inputLabel='Email Address'
          labelFor='email'
          inputType='email' // Change to email type for validation
          inputId='email'
          inputName='email'
          placeholderText='Enter your email address'
          ariaLabelName='Email'
          inputValue={formData.email}
          onChange={handleChange}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          required
        />
        <FormInput
          inputLabel='Code'
          labelFor='code'
          inputType='text'
          inputId='code'
          inputName='code'
          placeholderText='Enter code sent to your email address'
          ariaLabelName='Code'
          inputValue={formData.code}
          onChange={handleChange}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          required
        />
        <FormInput
          inputLabel='New Password'
          labelFor='password'
          inputType='password' // Change to password type for security
          inputId='password'
          inputName='password'
          placeholderText='Enter your new password'
          ariaLabelName='Password'
          inputValue={formData.password}
          onChange={handleChange}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          required
        />
        <FormInput
          inputLabel='Confirm Password'
          labelFor='repeatedPassword'
          inputType='password' // Change to password type for security
          inputId='repeatedPassword'
          inputName='repeatedPassword'
          placeholderText='Confirm your new password'
          ariaLabelName='Repeated Password'
          inputValue={formData.repeatedPassword}
          onChange={handleChange}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          required
        />
        <Button
          className='w-full md:text-base text-white font-medium px-6 py-4 rounded-md bg-[#720D96]'
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}{' '}
          {/* Show loading text when waiting */}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ChangePasswordForm;
